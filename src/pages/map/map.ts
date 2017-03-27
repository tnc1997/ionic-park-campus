import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Buildings} from '../../providers/providers';
import {Building} from '../../models/building';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class Map {
  lat: Number = 51.88694;
  lng: Number = -2.08864;
  zoom: Number = 16;

  currentBuildings: Building[];

  constructor(public navCtrl: NavController, public buildings: Buildings) {
    this.currentBuildings = buildings.findAll();
  }

  onBuildingChange(buildingCode: string) {
    for (let building of this.currentBuildings) {
      if (buildingCode == building.code) {
        this.lat = building.lat;
        this.lng = building.lng;
        this.zoom = 19;

        break;
      }
    }
  }
}
