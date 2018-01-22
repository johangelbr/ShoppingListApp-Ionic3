import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController, AlertController, ToastController, NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private firebaseService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ){

  }
  onLogin(form: NgForm){
    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Signing you in!!'
    });
    loading.present();
    this.firebaseService.signin(form.value.email, form.value.password).then(data => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Welcome back '+ data.email+ '!',
        duration: 2500,
        position: 'top'
      });
      toast.present();
    }).catch(error => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Signin failed!',
        message: error.message,
        buttons:['Ok']
      });
      alert.present();
      console.log(error);
    });
  }
  onSingUp(){
    this.navCtrl.push(SignupPage)
  }
}
