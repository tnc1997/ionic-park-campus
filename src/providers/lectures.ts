import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Lecture} from '../models/lecture';
import {Module} from '../models/module';

@Injectable()
export class LectureProvider {
  constructor(public http: Http, public storage: Storage) {

  }

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
