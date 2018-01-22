import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    private firebaseService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController){

  }
  onSignup(form : NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...',
      spinner: 'dots'
    });
    loading.present();
   this.firebaseService.signup(form.value.email, form.value.password)
   .then(
     data => {
       loading.dismiss();
       let toast = this.toastCtrl.create({
         message: 'Welcome '+data.email + ' to the recipe paradise!',
         position: 'top',
         duration: 2000
       });
       toast.present();

      }
   ).catch(
     error => {
       loading.dismiss();
       let alert = this.alertCtrl.create({
         title: 'Signup failed!',
         message: error.message,
         buttons: ['Ok']
       });
       alert.present();
      }
   );
  }
}
