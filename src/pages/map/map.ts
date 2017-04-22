import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BuildingProvider} from '../../providers/providers';
import {Building} from '../../models/building';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class Map {
  lat: Number = 51.88694;
  lng: Number = -2.08864;
  zoom: Number = 16;

  buildings: Building[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public buildingProvider: BuildingProvider) {
    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;

      if (navParams.get("building") != null) {
        this.onBuildingChange((<Building> navParams.get("building")).id);
      }
    });
  }

  onBuildingChange(buildingId: Number) {
    for (let i = 0; i < this.buildings.length; i++) {
      let building: Building = this.buildings[i];

      if (buildingId == building.id) {
        this.lat = Number(building.lat + "");
        this.lng = Number(building.lng + "");
        this.zoom = 19;

        break;
      }
    }
  }
}
