import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, NavController} from 'ionic-angular';
import {EntityList} from '../entity-list/entity-list';
import {Setup} from '../setup/setup';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
  entities = [];

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public storage: Storage) {
    this.entities = [{name: "Lectures"}, {name: "Modules"}];
  }

  eraseData() {
    let alert = this.alertCtrl.create({
      title: "Erase Data?",
      message: "This will completely erase all data.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Erase",
          handler: () => {
            this.storage.clear().then(() => {
              this.navCtrl.setRoot(Setup);
            });
          }
        }
      ]
    });
    alert.present();
  }

  openEntity(entity) {
    this.navCtrl.push(EntityList, {
      entity: entity
    });
  }
}
