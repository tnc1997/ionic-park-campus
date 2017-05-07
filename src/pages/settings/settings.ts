import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, NavController} from 'ionic-angular';
import {EntityList} from '../entity-list/entity-list';
import {Setup} from '../setup/setup';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

/**
 * The settings page allows users to create new entities and delete any entities currently stored in the application,
 * in addition to allowing them to erase all data currently stored in application.
 */
export class Settings {
  entities = [];

  /**
   * Defines the entities used by the application, such as lectures and modules.
   *
   * @param {AlertController} alertCtrl controls the displaying of alerts in the application
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {Storage} storage the ionic storage api, used to interact with and store data
   */
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public storage: Storage) {
    this.entities = [{name: "Lectures"}, {name: "Modules"}];
  }

  /**
   * An alert is created which confirms with the user that all data will be removed by completing this action. If the
   * user clicks the erase option then the storage is completely cleared and the user is taken back to the setup.
   */
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

  /**
   * Pushes the entity list page onto the navigation stack, passing in the selected entity.
   *
   * @param entity the course that the user has selected
   */
  openEntity(entity) {
    this.navCtrl.push(EntityList, {
      entity: entity
    });
  }
}
