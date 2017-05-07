import {Injectable} from '@angular/core';
import {Api} from './api';
import {Course} from '../models/course';
import {BuildingProvider} from './providers';
import 'rxjs/add/operator/map';

@Injectable()

/**
 * Used by the application to interact with the courses stored in the database on the server.
 */
export class CourseProvider {
  /**
   * Stores an instance of the building provider class to be used by the course provider.
   */
  buildingProvider: BuildingProvider;

  /**
   * @param {Api} api the class containing methods which facilitate interaction with the server
   */
  constructor(public api: Api) {
    this.buildingProvider = new BuildingProvider(api);
  }

  /**
   * Retrieves either all courses stored on the server, or the course matching the specified ID.
   *
   * @param {Number} id used to specify the unique identifier of the course
   * @returns {Promise} contains the courses retrieved from the server
   */
  queryCourses(id?: Number) {
    return new Promise((resolve, reject) => {
      this.api.getEntity("courses", id).map(res => res.json()).subscribe((values) => {
        let courses = [];

        if (values != null && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
            this.buildingProvider.queryBuildings(values[i].building_id).then((buildings) => {
              courses.push(new Course(values[i].course_id, values[i].course_name, values[i].course_synopsis, values[i].course_description, buildings[0]));
            });
          }
        }

        resolve(courses);
      }, (error) => {
        reject(error);
      });
    });
  }
}
