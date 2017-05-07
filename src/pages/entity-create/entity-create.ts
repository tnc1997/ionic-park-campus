import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Building} from '../../models/building';
import {Module} from '../../models/module';
import {BuildingProvider, ModuleProvider} from '../../providers/providers';

@Component({
  selector: 'page-entity-create',
  templateUrl: 'entity-create.html'
})

/**
 * The entity creation page allows the user to create lectures or modules depending on which option has been selected.
 */
export class EntityCreate {
  entity: {name: String};

  createEntity: FormGroup;

  buildings: Building[];
  modules: Module[];

  days = [
    {value: 1, name: "Monday"},
    {value: 2, name: "Tuesday"},
    {value: 3, name: "Wednesday"},
    {value: 4, name: "Thursday"},
    {value: 5, name: "Friday"}
  ];

  /**
   * Fetches a list of buildings and modules then stores them in their respective arrays. After this, the entity is
   * checked to determine whether it is lectures or modules in order to display the relevant creation form.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {NavParams} navParams stores the parameters passed between pages during navigation
   * @param {ViewController} viewCtrl controls the views, such as modals and popovers
   * @param {FormBuilder} formBuilder builds forms using form groups and validators
   * @param {BuildingProvider} buildingProvider contains CRUD methods to access building related data
   * @param {ModuleProvider} moduleProvider contains CRUD methods to access module related data
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public buildingProvider: BuildingProvider, public moduleProvider: ModuleProvider) {
    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;
    });

    this.moduleProvider.findAll().then((values) => {
      this.modules = <Array<Module>> values;
    });

    this.entity = navParams.get("entity");

    switch (this.entity.name) {
      case "Lectures":
        this.createEntity = formBuilder.group({
          module: ["", Validators.required],
          lecturer: ["", Validators.required],
          building: ["", Validators.required],
          room: ["", Validators.required],
          day: ["", Validators.required],
          startTime: ["", Validators.required],
          finishTime: ["", Validators.required]
        });

        break;
      case "Modules":
        this.createEntity = formBuilder.group({
          code: ["", Validators.required],
          name: ["", Validators.required]
        });

        break;
    }
  }

  /**
   * Dismisses the current view, without passing any parameters back to the previous view.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * Dismisses the current view, passing back the create entity form data to the previous view.
   */
  done() {
    this.viewCtrl.dismiss(this.createEntity.value);
  }
}
