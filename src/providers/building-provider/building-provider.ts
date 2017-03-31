import {Injectable} from '@angular/core';
import {Building} from '../../models/building';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingProvider {
  buildings: Building[] = [];

  constructor() {
    let buildings = [
      {code: "be", name: "Bedford Building", lat: 51.88788, lng: -2.08754},
      {code: "bl", name: "Broadlands Lodge", lat: 51.88574, lng: -2.09028},
      {code: "bv", name: "Broadlands Villa", lat: 51.88658, lng: -2.08726},
      {code: "cw", name: "Cornerways Building", lat: 51.88873, lng: -2.08593},
      {code: "dh", name: "Dunholme Villa", lat: 51.88744, lng: -2.08656},
      {code: "fb", name: "Farmery Building", lat: 51.88622, lng: -2.09066},
      {code: "fh", name: "Fullwood House", lat: 51.88756, lng: -2.08872},
      {code: "fl", name: "Fullwood Lodge", lat: 51.88828, lng: -2.08914},
      {code: "ha", name: "Hall Building", lat: 51.88790, lng: -2.08720},
      {code: "jo", name: "Jones Building", lat: 51.88816, lng: -2.08798},
      {code: "ew", name: "Media School", lat: 51.88758, lng: -2.08758},
      {code: "mk", name: "Monk Building", lat: 51.88776, lng: -2.08808},
      {code: "ow", name: "Owen Building", lat: 51.88816, lng: -2.08772},
      {code: "pl", name: "Pallas Villa", lat: 51.88842, lng: -2.08720},
      {code: "re", name: "Reynolds Building", lat: 51.88836, lng: -2.08786},
      {code: "tc", name: "Teaching Centre", lat: 51.88712, lng: -2.08720},
      {code: "ww", name: "Waterworth Building", lat: 51.88824, lng: -2.08852}
    ];

    for (let building of buildings) {
      this.buildings.push(new Building(building.code, building.name, building.lat, building.lng));
    }
  }

  createBuilding(building: Building) {
    this.buildings.push(building);
  }

  deleteBuilding(building: Building) {
    this.buildings.splice(this.buildings.indexOf(building), 1);
  }

  findAll() {
    return this.buildings;
  }
}
