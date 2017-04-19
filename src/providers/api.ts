import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

// Adapted From: https://github.com/driftyco/ionic-starter-super

@Injectable()
export class Api {
  url: String = "http://ct5006-g7.studentsites.glos.ac.uk/api";

  constructor(public http: Http) {

  }

  deleteEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.post(this.url + "/" + endpoint, body, options);
  }

  getEntity(endpoint: String, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    if (params) {
      let urlSearchParams = new URLSearchParams();

      for (let param in params) {
        urlSearchParams.set(param, params[param]);
      }

      options.search = !options.search && urlSearchParams || options.search;
    }

    return this.http.get(this.url + "/" + endpoint, options);
  }

  patchEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.put(this.url + "/" + endpoint, body, options);
  }

  postEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.post(this.url + "/" + endpoint, body, options);
  }

  putEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.put(this.url + "/" + endpoint, body, options);
  }
}
