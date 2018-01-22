import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../modals/recipe.interface';
import { RecipesService } from '../../services/recipesList.service';
import { RecipePage } from '../recipe/recipe';
import { AuthService } from '../../services/auth.service';
import { SLOptionsRecipePage } from './sl-options/sl-options.recipes';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage{

  constructor(private navCtrl: NavController,
    private recipeService: RecipesService,
    private alertCtrl: AlertController,
    private loading: LoadingController,
  private popoverCtrl: PopoverController,
  private authService: AuthService,
  private toast: ToastController) {
    this.recipeList = this.recipeService.getRecipes();
  }
  recipeList: Recipe[];
  addRecipe(){
    this.navCtrl.push(EditRecipePage,{mode: 'New'});
  }
  onLoadRecipe(recipe: Recipe, index: number){
    console.log(recipe);
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }
  swipe(event) {
    console.log('Hi');
    if(event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }
  ionViewWillEnter(){
    console.log('viewwill');
    this.recipeList = this.recipeService.getRecipes();
  }

  onShowOptions(event){
    const popover = this.popoverCtrl.create(SLOptionsRecipePage);
    popover.present({ev:event});
    popover.onDidDismiss(data => {
      if(data != null){
        if(data.action == 'added'){
          console.log('Refresh Page, Added')
        }else{
          if(data.action == 'load'){
            const loading = this.loading.create({
              content: 'Loading your recipes...',
              spinner: 'bubbles'
            });
            loading.present();
            this.authService.getActiveUser().getIdToken().then(
              (token: string) => {
                this.recipeService.fecthList(token)
                .subscribe(
                  (list: Recipe[]) => {
                    if(list){
                      this.recipeList = list;
                      let toast = this.toast.create({
                        message: 'Your recipes hava been loaded! ('+ this.recipeList.length+')',
                        duration: 2000,
                        position: 'button'
                      });
                      toast.present();
                    }else {
                      let toast = this.toast.create({
                        message: 'You have no recipes, add a few and save it!',
                        duration: 2000,
                        position: 'button'
                      });
                      toast.present();
                      this.recipeList = [];
                    }

                  },
                  error => {
                    console.log(error);
                    this.handleErrors(error.json().error);
                  }
                );
                loading.dismiss();
              }
            )
            console.log(data);
          }else{
            const loading = this.loading.create({
              content: 'Saving your recipes...',
              spinner: 'bubbles'
            });
            loading.present();
            this.authService.getActiveUser().getIdToken().then(
              (token: string) =>{
                console.log(token);
                this.recipeService.storeRecipe(token)
                .subscribe(
                  () => {
                    console.log('Success');
                    let toast = this.toast.create({
                      message: 'Success, your list is save online!',
                      duration: 2000,
                      position: 'button'
                    });
                    toast.present();
                },
                  error => {
                    this.handleErrors(error.json().error);
                    let toast = this.toast.create({
                      message: 'Sorry, something went wrong, try again!',
                      duration: 2000,
                      position: 'button'
                    });
                    toast.present();;
                  }
                )
              }
            );
            loading.dismiss();
          }
        }
      }



    });
  }
  handleErrors(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons:['Ok']
    });
    alert.present();
  }


}
