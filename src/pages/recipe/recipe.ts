import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../modals/recipe.interface';
import { NavParams, NavController, ToastController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shoppingList.service';
import { RecipesService } from '../../services/recipesList.service';


@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;
  index:number;
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private shopListService: ShoppingListService,
    private toast : ToastController,
    private recipeService: RecipesService) {
  }


  onAddIngredients(){
    this.shopListService.addItems(this.recipe.items);
    console.log(this.shopListService.getShoppingList());
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(0);
    let toast = this.toast.create({
      message: 'Items added to Shopping List!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  onEdit(){
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe : this.recipe, index: this.index});
  }
  deleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    let toast = this.toast.create({
      message: 'Recipe '+this.recipe.title+' removed',
      duration: 2000,
    });
    toast.present();
    this.navCtrl.popToRoot();
  }
  ionViewWillEnter(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }
  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
    console.log(this.navParams.data);
  }
}
