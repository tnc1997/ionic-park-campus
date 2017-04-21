import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {EntityCreate} from '../entity-create/entity-create';
import {Lecture} from '../../models/lecture';
import {Module} from '../../models/module';
import {Time} from '../../models/time';
import {BuildingProvider, LectureProvider, ModuleProvider} from '../../providers/providers';
import {Building} from "../../models/building";

@Component({
  selector: 'page-entity-list',
  templateUrl: 'entity-list.html'
})
export class EntityList {
  entity: {name: String};
  entities: Object;

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public buildingProvider: BuildingProvider, public lectureProvider: LectureProvider, public moduleProvider: ModuleProvider) {
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
        switch (this.entity.name) {
         case "Lectures":
           let lecture = new Lecture(null, entity.lecturer, null, entity.room, entity.day, new Time(entity.startTime), new Time(entity.finishTime));

           this.moduleProvider.findByCode(entity.module).then((module: Module) => {
             lecture.module = module;

             return this.buildingProvider.queryBuildings(entity.building);
           }).then((buildings: Building[]) => {
             lecture.building = buildings.pop();

             this.lectureProvider.createLecture(lecture);
           });

           break;
         case "Modules":
           this.moduleProvider.createModule(new Module(entity.code, entity.name));

           break;
        }
      }
    });
    createModal.present();
  }

  deleteEntity(entity) {
    switch (this.entity.name) {
      case "Lectures":
        this.lectureProvider.deleteLecture(entity);

        break;
      case "Modules":
        let alert = this.alertCtrl.create({
          title: "Delete Module?",
          message: "This will also delete the associated lecture.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Delete",
              handler: () => {
                this.moduleProvider.deleteModule(entity);
              }
            }
          ]
        });
        alert.present();

        break;
    }
  }

  onRefresh(refresher) {
    setTimeout(() => {
      switch (this.entity.name) {
        case "Lectures":
          this.lectureProvider.findAll().then((values) => {
            this.entities = <Array<Lecture>> values;
          });

          break;
        case "Modules":
          this.moduleProvider.findAll().then((values) => {
            this.entities = <Array<Module>> values;
          });

          break;
      }

      refresher.complete();
    }, 2000);
  }
}
