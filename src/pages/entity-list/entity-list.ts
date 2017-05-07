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

/**
 * The entity list page contains a list of all the entities in the application, such as lectures and modules.
 */
export class EntityList {
  entity: {name: String};
  entities: Object;

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /**
   * Fetches the type of entity from the navigation parameters and displays a list of all the data stored for that
   * entity via the use of promises.
   *
   * @param {AlertController} alertCtrl controls the displaying of alerts in the application
   * @param {ModalController} modalCtrl controls the displaying of modal pages in the application
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {NavParams} navParams stores the parameters passed between pages during navigation
   * @param {BuildingProvider} buildingProvider contains CRUD methods to access building related data
   * @param {LectureProvider} lectureProvider contains CRUD methods to access lecture related data
   * @param {ModuleProvider} moduleProvider contains CRUD methods to access module related data
   */
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

  /**
   * Creates a modal, passing in the entity, which allows the user to create an entity of that type, such as a lecture
   * or a module. Upon dismissal of the modal page, the entity is created using the relevant provider. Chained
   * promises are used to create a lecture due to the asynchronous nature of the process involved.
   */
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

  /**
   * Checks the type of entity present, before using the relevant provider to delete the selected entity. If the user
   * has selected to delete a module then the application warns them that this will also delete the lecture that
   * is attached to the selected module.
   *
   * @param entity the selected entity to be deleted, such as a lecture or a module
   */
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

  /**
   * Refreshes the view when the user swipes downwards and updates the list of entities displayed.
   *
   * @param refresher the object which controls the status of the refresh animation
   */
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
