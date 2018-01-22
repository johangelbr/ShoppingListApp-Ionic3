import { Recipe } from "../modals/recipe.interface";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "./auth.service";
import { Response } from "@angular/http";
import 'rxjs/Rx';
@Injectable()
export class RecipesService{
  private recipesList: Recipe[] = [];
  constructor(private http: Http, private AuthService: AuthService){

  }
  addRecipe(recipe: Recipe){
    if(this.recipesList.length == 0){
      this.recipesList.push(recipe);
      console.log(this.recipesList);
      return true;
    }else {
      const pos = this.recipesList.findIndex((recipeEl: Recipe) => {
        return recipeEl.title == recipe.title;
      });
      console.log(pos)
      if(pos == -1){
        this.recipesList.push(recipe);
        console.log(this.recipesList);
      }else {
        return false;
      }
      return true;
    }

  }

  getRecipes(){
    console.log(this.recipesList);
    return this.recipesList.slice();
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipesList[index] = recipe;
  }

  removeRecipe(index: number){
    this.recipesList.splice(index, 1);
  }
  storeRecipe(token: string){
    const userId = this.AuthService.getActiveUser().uid;
    return this.http
    .put('https://ionic2-shoppinglist-1b87a.firebaseio.com/'+userId+'/recipe-list.json?auth='+token, this.recipesList)
    .map((response: Response) => {
      return response.json();
    });
  }
  fecthList(token: string){
    const userId= this.AuthService.getActiveUser().uid;
    return this.http.get('https://ionic2-shoppinglist-1b87a.firebaseio.com/'+userId+'/recipe-list.json?auth='+ token)
    .map((response: Response) => {
      return response.json();
    }).do((data) => {
      if(data){
        this.recipesList = data;
      } else {
        this.recipesList =[];
      }

    });
  }

}
