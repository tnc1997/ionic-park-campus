import {Injectable} from '@angular/core';
import {Api} from './api';
import {Course} from '../models/course';
import {BuildingProvider} from './providers';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseProvider {
  buildingProvider: BuildingProvider;

  constructor(public api: Api) {
    this.buildingProvider = new BuildingProvider(api);
  }

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
