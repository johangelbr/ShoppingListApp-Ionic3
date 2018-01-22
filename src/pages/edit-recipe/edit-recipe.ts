import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { RecipesService } from '../../services/recipesList.service';
import { Recipe } from '../../modals/recipe.interface';







@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode ='New';
  selectOptions = ['Easy', 'Medium', 'High', 'Only grandma'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(
    private nvParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipesService,
    private navCtrl: NavController
  ) {
  }

  ngOnInit(){
    this.mode = this.nvParams.get('mode');
    if(this.mode =='Edit'){
      this.recipe = this.nvParams.get('recipe');
      this.index = this.nvParams.get('index');
      console.log(this.recipe);
    }
    this.initializeForm();
  }


  onSubmit(){
    const value = this.recipeForm.value;
    console.log(value);
    let ingredients =[];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1}
      });
      console.log(ingredients);
    }
    let recipe = new Recipe(value.title, value.description, value.dificulty, ingredients);
    if(this.mode == 'New'){
      if(this.recipeService.addRecipe(recipe)){
        let toast = this.toastCtrl.create({
          message: 'Recipe '+ recipe.title+' added!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }else {
        let toast = this.toastCtrl.create({
          message: 'Recipe '+ recipe.title +' already added. Try editing!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
      this.recipeForm.reset();
      this.navCtrl.pop();
    }else {
      this.recipeService.updateRecipe(this.index, recipe);
      let toast = this.toastCtrl.create({
        message: 'Recipe '+ recipe.title +' updated!',
        duration: 2000,
        position: 'top',
        cssClass: "toast"
      });
      toast.present();
      this.recipeForm.reset();
      this.navCtrl.popToRoot();
    }


  }
  onManageIngredients(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            console.log('Add');
            this.presentPrompt().present();
          }
      },
      {
        text: 'Remove Ingredients',
        role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for(let i = len -1; i>=0; i--){
                fArray.removeAt(i);
              }
              let toastCtrl = this.toastCtrl.create({
                message: 'All ingredients removed',
                duration: 2000,
                position : 'top'
              });
              toastCtrl.present();
            }

          }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
    });
    actionSheet.present();
  }

  presentPrompt() {
    return  this.alertCtrl.create({
      title: 'Add New Item',
      subTitle: 'What is the item of the recipe?',
      inputs: [
        {
          name: 'name',
          placeholder: 'Milk'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              let toastCtrl = this.toastCtrl.create({
                message: 'Please enter a valid name',
                duration: 2000,
                position : 'top'
              });
              toastCtrl.present();
              return
            }
            let toastCtrl = this.toastCtrl.create({
              message: 'Item '+data.name+' added',
              duration: 2000,
              position : 'top'
            });
            toastCtrl.present();
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required) );
          }
        }
      ]
    });

  }
  private initializeForm(){
    let title= null;
    let description = null;
    let dificulty = 'Medium';
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      dificulty = this.recipe.dificulty;
      if(this.recipe.items.length >0){
        for(let ingredient of this.recipe.items){
          ingredients.push(new FormControl(ingredient.name, Validators.required));
        }
      }

    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'dificulty': new FormControl(dificulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
  get formData() { return <FormArray>this.recipeForm.get('ingredients');
}
}
