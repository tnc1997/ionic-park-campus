import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {EntityCreate} from '../entity-create/entity-create';
import {Lecture} from '../../models/lecture';
import {Module} from '../../models/module';
import {LectureProvider, ModuleProvider} from '../../providers/providers';

@Component({
  selector: 'page-entity-list',
  templateUrl: 'entity-list.html'
})
export class EntityList {
  entity: {name: String};
  entities: Object;

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public lectureProvider: LectureProvider, public moduleProvider: ModuleProvider) {
    this.entity = navParams.get("entity");
    this.entities = [];

    switch (this.entity.name) {
      case "Lectures":
        lectureProvider.findAll().then((values) => {
          this.entities = <Array<Lecture>> values;
        });

        break;
      case "Modules":
        moduleProvider.findAll().then((values) => {
          this.entities = <Array<Module>> values;
        });

        break;
    }
  }

  createEntity() {
    let createModal = this.modalCtrl.create(EntityCreate, {entity: this.entity});
    createModal.onDidDismiss((entity) => {
      if (entity != null) {
        console.log(entity);
      }

      /*switch (this.entity.name) {
        case "Lectures":
          this.lectureProvider.createLecture(entity);

          break;
        case "Modules":
          this.moduleProvider.createModule(entity);

          break;
      }*/
    });
    createModal.present();
  }

  deleteEntity(entity) {
    switch (this.entity.name) {
      case "Lectures":
        this.lectureProvider.deleteLecture(entity);

        break;
      case "Modules":
        this.moduleProvider.deleteModule(entity);

        break;
    }
  }
}
