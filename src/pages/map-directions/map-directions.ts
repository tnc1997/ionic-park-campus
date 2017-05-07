import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ViewController} from 'ionic-angular';
import {BuildingProvider} from '../../providers/providers';
import {Building} from '../../models/building';

@Component({
  selector: 'page-map-directions',
  templateUrl: 'map-directions.html'
})

/**
 * The map directions page is displayed as a modal from the map page and allows the user to enter an origin, which can
 * be their current location, and a destination to get directions between.
 */
export class MapDirections {
  searchDirections: FormGroup;

  buildings: Building[];

  /**
   * Fetches a list of buildings to be displayed in the select boxes, then generates the form using the form builder.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {ViewController} viewCtrl controls the views, such as modals and popovers
   * @param {FormBuilder} formBuilder builds forms using form groups and validators
   * @param {BuildingProvider} buildingProvider contains CRUD methods to access building related data
   */
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public formBuilder: FormBuilder, public buildingProvider: BuildingProvider) {
    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;
    });

    this.searchDirections = formBuilder.group({
      origin: ["", Validators.required],
      destination: ["", Validators.required],
    });
  }

  /**
   * Dismisses the current view, without passing any parameters back to the previous view.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * Dismisses the current view, passing back the origin and destination to the previous view. If the origin select
   * box is enabled then the selected building is used as the origin, however if this box is disabled then the
   * application will use the user's current location instead.
   */
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

  /**
   * Disables the origin select box if it is already enabled and sets its value as "Current Location", or enables the
   * origin select box if it already disabled and nullifies its value.
   */
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
