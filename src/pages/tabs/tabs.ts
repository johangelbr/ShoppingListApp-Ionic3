import { Component } from '@angular/core';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes/recipes';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoot1 = ShoppingListPage;
  tabRoot2 = RecipesPage;



}
