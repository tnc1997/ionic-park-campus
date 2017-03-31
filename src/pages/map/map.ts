import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public buildingProvider: BuildingProvider) {
    this.buildings = buildingProvider.findAll();
  }

  onBuildingChange(buildingCode: string) {
    for (let building of this.buildings) {
      if (buildingCode == building.code) {
        this.lat = building.lat;
        this.lng = building.lng;
        this.zoom = 19;

        break;
      }
    }
  }
}
