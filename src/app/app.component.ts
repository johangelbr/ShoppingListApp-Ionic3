import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signInPage = SigninPage;
  signUpPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private firebaseService: AuthService,
    private toastCtrl: ToastController
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyA1LiSAPxIwJDzNx8T6Y24OWH91BUoA6UY",
      authDomain: "ionic2-shoppinglist-1b87a.firebaseapp.com",
      databaseURL: "https://ionic2-shoppinglist-1b87a.firebaseio.com",
      projectId: "ionic2-shoppinglist-1b87a",
      storageBucket: "ionic2-shoppinglist-1b87a.appspot.com",
      messagingSenderId: "527230502483"
    });
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      }else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signInPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();

  }
  onLogOut(){
    this.firebaseService.logout();
    this.menuCtrl.close();
    let toast = this.toastCtrl.create({
      message: 'Logged Out! Comeback soon',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}

