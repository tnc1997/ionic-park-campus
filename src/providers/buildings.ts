import {Injectable} from '@angular/core';
import {Api} from './api';
import {Building} from '../models/building';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingProvider {
  constructor(public api: Api) {

  }

  queryBuildings(id?: Number) {
    return new Promise((resolve, reject) => {
      this.api.getEntity("buildings", id).map(res => res.json()).subscribe((values) => {
        let buildings = [];

        if (values != null && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
            buildings.push(new Building(values[i].building_id, values[i].building_code, values[i].building_name, values[i].building_lat, values[i].building_lng));
          }
        }

        resolve(buildings);
      }, (error) => {
        reject(error);
      });
    });
  }
}
