import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

// Adapted From: https://github.com/driftyco/ionic-starter-super

@Injectable()
export class Api {
  url: String = "http://ct5006-g7.studentsites.glos.ac.uk/api";

  constructor(public http: Http) {

  }

  deleteEntity(endpoint: String, id: Number, options?: RequestOptions) {
    return this.http.delete(this.url + "/" + endpoint + "/" + id, options);
  }

  getEntity(endpoint: String, id?: Number, options?: RequestOptions) {
    if (id == null) {
      return this.http.get(this.url + "/" + endpoint, options);
    } else {
      return this.http.get(this.url + "/" + endpoint + "/" + id, options);
    }
  }

  patchEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.patch(this.url + "/" + endpoint, body, options);
  }

  postEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.post(this.url + "/" + endpoint, body, options);
  }

  putEntity(endpoint: String, id: Number, body: any, options?: RequestOptions) {
    return this.http.put(this.url + "/" + endpoint + "/" + id, body, options);
  }
}
