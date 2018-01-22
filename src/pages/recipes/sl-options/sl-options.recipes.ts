import { Component } from "@angular/core";
import { ViewController, AlertController } from "ionic-angular";
import { EditRecipePage } from "../../edit-recipe/edit-recipe";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-sl-optionsrecipe',
  template: `
  <ion-grid text-center>
  <ion-row>
    <ion-col >
      <h3>Store & Load</h3>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col >
      <button ion-button outline (click)="addNew()">
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
export class SLOptionsRecipePage {
  constructor(private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private navCtrl: NavController){}

  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
  }
  addNew(){
    this.navCtrl.push(EditRecipePage,{mode: 'New'});
    this.viewCtrl.dismiss({action: 'added'});
  }

}
