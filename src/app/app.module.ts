import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipesPage } from '../pages/recipes/recipes';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { ShoppingListService } from '../services/shoppingList.service';
import { RecipesService } from '../services/recipesList.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { SLOptionsPage } from '../pages/shopping-list/sl-options/sl-options';
import { HttpModule } from '@angular/http';
import { SLOptionsRecipePage } from '../pages/recipes/sl-options/sl-options.recipes';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    SigninPage,
    SignupPage,
    SLOptionsPage,
    SLOptionsRecipePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    SigninPage,
    SignupPage,
    SLOptionsPage,
    SLOptionsRecipePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
