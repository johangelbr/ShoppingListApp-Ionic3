import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shoppingList.service';
import { Item } from '../../modals/item.interface';
import { ToastController, NavController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { SLOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  items: Item[];
  done= false;
  constructor(private navCtrl: NavController,
    private slServie: ShoppingListService,
    private toast: ToastController,
    private authService: AuthService,
    private popoverCtrl: PopoverController,
    private loading: LoadingController,
    private alertCtrl: AlertController
  ){
    this.getItems();
  }
  onAddItem(form: NgForm, name:string = 'none', amount: number = 1234567){
  console.log('add');
  let toast;
  if(name == 'none' && amount == 1234567){
    const added = this.slServie.addItemtoShoppingList(form.value.ingredientName, Number(form.value.amount));
   if(added){
        toast = this.toast.create({
        message: 'Your item was added!',
        duration: 1500,
        position: 'button'
      });
    }else {
        toast = this.toast.create({
        message: 'Your item is already added!',
        duration: 2000,
        position: 'button'
      });
    }
    form.reset();
  }else{
    const added = this.slServie.addItemtoShoppingList(name,amount);
   if(added){
        toast = this.toast.create({
        message: 'Your item was added!',
        duration: 1500,
        position: 'button'
      });
    }else {
        toast = this.toast.create({
        message: 'Your item is already added!',
        duration: 2000,
        position: 'button'
      });
    }
  }
   toast.present();
    this.getItems();

  }

  ionViewWillEnter(){
   this.getItems();
    if(!this.done){
      this.getActiveUsers();
      this.done =true;
    }

  }
  private getItems(){
    this.items = this.slServie.getShoppingList();
  }
  showItem(i: number){
    console.log('Show Items');
  }
  getActiveUsers(){
    this.authService.getActiveUser().getIdToken().then(
      (token: string) => {
        this.slServie.fecthList(token)
        .subscribe(
          (list: Item[]) => {
            if(list){
              this.items = list;
              let toast = this.toast.create({
                message: 'Your items hava been loaded! ('+ this.items.length+')',
                duration: 2000,
                position: 'button'
              });
              toast.present();
            }else {
              let toast = this.toast.create({
                message: 'You have no items, add a few and save it!',
                duration: 2000,
                position: 'button'
              });
              toast.present();
              this.items = [];
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    )
  }
  isItemsEmpty(){
    return this.items.length == 0 ? true : false;
  }
  onShowOptions(event){
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev:event});
    popover.onDidDismiss(data => {
      if(data != null){
        if(data.action == 'added'){
          this.getItems();
        }else{
          if(data.action == 'load'){
            const loading = this.loading.create({
              content: 'Loading your items...',
              spinner: 'bubbles'
            });
            loading.present();
            this.authService.getActiveUser().getIdToken().then(
              (token: string) => {
                this.slServie.fecthList(token)
                .subscribe(
                  (list: Item[]) => {
                    if(list){
                      this.items = list;
                      let toast = this.toast.create({
                        message: 'Your items hava been loaded! ('+ this.items.length+')',
                        duration: 2000,
                        position: 'button'
                      });
                      toast.present();
                    }else {
                      let toast = this.toast.create({
                        message: 'You have no items, add a few and save it!',
                        duration: 2000,
                        position: 'button'
                      });
                      toast.present();
                      this.items = [];
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
              content: 'Saving your items...',
              spinner: 'bubbles'
            });
            loading.present();
            this.authService.getActiveUser().getIdToken().then(
              (token: string) =>{
                console.log(token);
                this.slServie.storeList(token)
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


  removeItem(i: number){
    console.log('Im removing the item' + i);
    this.slServie.removeItem(i);
    this.getItems();
  }
  swipeEvent(event, i:number, mode:string){
    // if(event.direction == 4 && event.distance >= 125 && mode =='item'){
    //    this.removeItem(i);
    //   console.log(event);
    // }
     if(event.direction == 2 && event.distance >=100 && mode =='item'){
      this.showItem(i);
      console.log(event);
     }else {
       if(event.direction == 2 && event.distance >=150 && mode == 'changePage'){
         console.log('swipe');
         this.navCtrl.parent.select(1);
       }
     }
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
