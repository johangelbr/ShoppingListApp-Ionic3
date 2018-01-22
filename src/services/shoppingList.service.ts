import { Item } from "../modals/item.interface";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "./auth.service";
import { Response } from "@angular/http";
import 'rxjs/Rx';
@Injectable()
export class ShoppingListService{
  private shoppingList: Item[] = [];
constructor(private http: Http, private AuthService: AuthService){

}
  addItemtoShoppingList(name: string, amount: number): boolean|void{
      this.shoppingList.push(new Item(name, amount));
      console.log(this.shoppingList);
      return true;


  }

  addItems(items: Item[]){
    this.shoppingList.push(...items);
  }

  getShoppingList(){
    return this.shoppingList.slice();
  }

  removeItem(index: number){
    this.shoppingList.splice(index, 1);
    console.log('I reamove the index');
  }
  storeList(token: string){
    const userId= this.AuthService.getActiveUser().uid;
    return this.http
    .put('https://ionic2-shoppinglist-1b87a.firebaseio.com/'+userId+'/shopping-list.json?auth='+ token, this.shoppingList)
    .map((response: Response) => {
      return response.json();
    });
  }
  fecthList(token: string){
    const userId= this.AuthService.getActiveUser().uid;
    return this.http.get('https://ionic2-shoppinglist-1b87a.firebaseio.com/'+userId+'/shopping-list.json?auth='+ token)
    .map((response: Response) => {
      return response.json();
    }).do((data) => {
      if(data){
        this.shoppingList = data;
      } else {
        this.shoppingList =[];
      }

    });
  }
  }
