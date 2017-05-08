import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

/**
 * Used to connect to the REST API on the server in order to set and retrieve data. Adapted from Ionic.
 *
 * @see <a href="https://github.com/driftyco/ionic-starter-super">Ionic Super Starter</a>
 */
export class Api {
  /**
   * Used to store the URL to the REST API on the server.
   *
   * @type {String}
   */
  url: String = "https://ct5006-g7.studentsites.glos.ac.uk/api";

  /**
   * @param {Http} http the protocol used for communication with the server
   */
  constructor(public http: Http) {

  }

  /**
   * Deletes an entity from the database on the server via the REST API.
   *
   * @param {String} endpoint the table name to use, such as buildings or courses
   * @param {Number} id the unique identifier given to an entity, such as a building or a course
   * @param {RequestOptions} options the options to send with the server request
   * @returns {Observable<Response>} the data returned to the application from the server
   */
  deleteEntity(endpoint: String, id: Number, options?: RequestOptions) {
    return this.http.delete(this.url + "/" + endpoint + "/" + id, options);
  }

  /**
   * Retrieves an entity from the database on the server via the REST API.
   *
   * @param {String} endpoint the table name to use, such as buildings or courses
   * @param {Number} id the unique identifier given to an entity, such as a building or a course
   * @param {RequestOptions} options the options to send with the server request
   * @returns {Observable<Response>} the data returned to the application from the server
   */
  getEntity(endpoint: String, id?: Number, options?: RequestOptions) {
    if (id == null) {
      return this.http.get(this.url + "/" + endpoint, options);
    } else {
      return this.http.get(this.url + "/" + endpoint + "/" + id, options);
    }
  }

  /**
   * Updates an entity into the database on the server via the REST API.
   *
   * @param {String} endpoint the table name to use, such as buildings or courses
   * @param body the message sent to the server directly after the header
   * @param {RequestOptions} options the options to send with the server request
   * @returns {Observable<Response>} the data returned to the application from the server
   */
  patchEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.patch(this.url + "/" + endpoint, body, options);
  }

  /**
   * Posts an entity into the database on the server via the REST API.
   *
   * @param {String} endpoint the table name to use, such as buildings or courses
   * @param body the message sent to the server directly after the header
   * @param {RequestOptions} options the options to send with the server request
   * @returns {Observable<Response>} the data returned to the application from the server
   */
  postEntity(endpoint: String, body: any, options?: RequestOptions) {
    return this.http.post(this.url + "/" + endpoint, body, options);
  }

  /**
   * Puts an entity into the database on the server via the REST API.
   *
   * @param {String} endpoint the table name to use, such as buildings or courses
   * @param {Number} id the unique identifier given to an entity, such as a building or a course
   * @param body the message sent to the server directly after the header
   * @param {RequestOptions} options the options to send with the server request
   * @returns {Observable<Response>} the data returned to the application from the server
   */
  putEntity(endpoint: String, id: Number, body: any, options?: RequestOptions) {
    return this.http.put(this.url + "/" + endpoint + "/" + id, body, options);
  }
}
