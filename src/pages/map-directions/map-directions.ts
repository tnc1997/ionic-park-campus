import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ViewController} from 'ionic-angular';
import {BuildingProvider} from '../../providers/providers';
import {Building} from '../../models/building';

@Component({
  selector: 'page-map-directions',
  templateUrl: 'map-directions.html'
})
export class MapDirections {
  searchDirections: FormGroup;

  buildings: Building[];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public formBuilder: FormBuilder, public buildingProvider: BuildingProvider) {
    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;
    });

    this.searchDirections = formBuilder.group({
      origin: ["", Validators.required],
      destination: ["", Validators.required],
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    this.viewCtrl.dismiss(this.searchDirections.value);
  }
}
