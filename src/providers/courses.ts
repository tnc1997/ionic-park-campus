import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Api} from './api';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseProvider {
  constructor(public http: Http, public api: Api) {

  }

  queryCourses(params?: any) {
    return this.api.getEntity("courses", params).map(res => res.json());
  }
}
