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
    let origin: {lat: Number, lng: Number}, destination: {lat: Number, lng: Number};

    this.buildingProvider.queryBuildings(this.searchDirections.value.destination).then((buildings: Building[]) => {
      destination = {lat: buildings[0].lat, lng: buildings[0].lng};

      if (this.searchDirections.get('origin').enabled) {
        this.buildingProvider.queryBuildings(this.searchDirections.value.origin).then((buildings: Building[]) => {
          origin = {lat: buildings[0].lat, lng: buildings[0].lng};

          this.viewCtrl.dismiss({
            origin: origin,
            destination: destination
          });
        });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          origin = {lat: position.coords.latitude, lng: position.coords.longitude};

          this.viewCtrl.dismiss({
            origin: origin,
            destination: destination
          });
        }, null, {maximumAge: 5000, timeout: 5000, enableHighAccuracy: true});
      }
    });
  }

  onClickCurrentLocation() {
    if (this.searchDirections.get('origin').enabled) {
      this.searchDirections.get('origin').setValue("My Location");
      this.searchDirections.get('origin').disable();
    } else {
      this.searchDirections.get('origin').setValue(null);
      this.searchDirections.get('origin').enable();
    }
  }
}
