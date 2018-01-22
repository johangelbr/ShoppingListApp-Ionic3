import { Component } from "@angular/core";
import { ViewController, AlertController } from "ionic-angular";
import { ShoppingListService } from "../../../services/shoppingList.service";

@Component({
  selector: 'page-sl-options',
  template: `
  <ion-grid text-center>
  <ion-row>
    <ion-col >
      <h3>Store & Load</h3>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col >
      <button ion-button outline (click)="showPrompt()">
        <ion-icon name="add-circle"></ion-icon>
        <div style="padding-left: 10px;">Add New</div>
      </button>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col >
      <button ion-button outline (click)="onAction('load')">
          <ion-icon name="cloud-download"></ion-icon>
        <div style="padding-left: 10px;">Load</div>
      </button>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col >

      <button ion-button outline (click)="onAction('store')">
      <ion-icon name="cloud-circle"></ion-icon>
      <div style="padding-left: 10px;">Save</div>
      </button>
    </ion-col>
  </ion-row>
</ion-grid>
  `
})
export class SLOptionsPage {
  constructor(private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private slServie: ShoppingListService){}

  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
  }
showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add new Item',
      message: "Enter a name for this new item you're so keen on adding",
      inputs: [
        {
          name: 'name',
          placeholder: 'Milk'
        },
        {
          name: 'amount',
          type: 'number',
          placeholder: '3'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data.name && data.amount){
              this.viewCtrl.dismiss({action: 'added'});
               this.slServie.addItemtoShoppingList(data.name, data.amount);
            }else {
              let alert = this.alertCtrl.create({
                title: 'Add valid data',
                message: 'Add the name and the amount please',
                buttons: ['Dismiss']
              });
              alert.present();
            }

          }
        }
      ]
    });
    prompt.present();

  }
}
