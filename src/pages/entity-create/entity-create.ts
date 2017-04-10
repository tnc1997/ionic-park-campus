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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public buildingProvider: BuildingProvider, public moduleProvider: ModuleProvider) {
    this.buildings = buildingProvider.findAll();

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

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    this.viewCtrl.dismiss(this.createEntity.value);
  }
}
