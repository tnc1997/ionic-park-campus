import {Injectable} from '@angular/core';
import {Api} from './api';
import {Building} from '../models/building';
import 'rxjs/add/operator/map';

@Injectable()

/**
 * Used by the application to interact with the buildings stored in the database on the server.
 */
export class BuildingProvider {
  /**
   * @param {Api} api the class containing methods which facilitate interaction with the server
   */
  constructor(public api: Api) {

  }

  /**
   * Retrieves either all buildings stored on the server, or the building matching the specified ID.
   *
   * @param {Number} id used to specify the unique identifier of the building
   * @returns {Promise} contains the buildings retrieved from the server
   */
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
