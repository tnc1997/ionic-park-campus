import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Lecture} from '../models/lecture';
import {Module} from '../models/module';

@Injectable()

/**
 * Used by the application to interact with the lectures stored on the user's device.
 */
export class LectureProvider {
  /**
   * @param {Storage} storage the class containing methods which facilitate interaction with the user's storage
   */
  constructor(public storage: Storage) {

  }

  /**
   * Takes the provided lecture and uses Ionic Storage to add it to the device's storage.
   *
   * @param {Lecture} lecture the lecture to add to the storage
   */
  createLecture(lecture: Lecture) {
    this.storage.get('_lectures').then((values) => {
      if (values == null) {
        this.storage.set('_lectures', [lecture]);
      } else {
        values.push(lecture);

        this.storage.set('_lectures', values);
      }
    });
  }

  /**
   * Takes the provided lecture and uses Ionic Storage to remove it from the device's storage.
   *
   * @param {Lecture} lecture the lecture to remove from the storage
   */
  deleteLecture(lecture: Lecture) {
    this.storage.get('_lectures').then((values) => {
      if (values != null) {
        for (let i = 0; i < values.length; i++) {
          let value = new Lecture(values[i]._module, values[i]._lecturer, values[i]._building, values[i]._room, values[i]._day, values[i]._startTime, values[i]._finishTime);

          if (lecture.building.code == value.building.code && lecture.finishTime.time == value.finishTime.time && lecture.module.code == value.module.code && lecture.lecturer == value.lecturer && lecture.room == value.room && lecture.startTime.time == value.startTime.time) {
            values.splice(i, 1);
          }
        }

        this.storage.set('_lectures', values);
      }
    });
  }

  /**
   * Uses Ionic Storage to find all lectures stored in the device's storage.
   *
   * @returns {Promise} contains the lectures retrieved from the storage
   */
  findAll() {
    return new Promise((resolve, reject) => {
      this.storage.get('_lectures').then((values) => {
        let lectures = [];

        if (values != null && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
            lectures.push(new Lecture(values[i]._module, values[i]._lecturer, values[i]._building, values[i]._room, values[i]._day, values[i]._startTime, values[i]._finishTime));
          }
        }

        resolve(lectures);
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * Takes the provided module and uses it to find the associated lecture stored in the device's storage.
   *
   * @param module the module to search for the lecture using
   * @returns {Promise} contains the lecture retrieved from the storage
   */
  findByModule(module: Module) {
    return new Promise((resolve, reject) => {
      this.findAll().then((values: Lecture[]) => {
        for (let i = 0; i < values.length; i++) {
          if (JSON.parse(JSON.stringify(values[i].module))._code == module.code && JSON.parse(JSON.stringify(values[i].module))._name == module.name) {
            resolve(values[i]);
          }
        }
      }, (error) => {
        reject(error);
      });
    });
  }
}
