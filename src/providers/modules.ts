import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Module} from '../models/module';

@Injectable()
export class Modules {
  constructor(public http: Http, public storage: Storage) {

  }

  create(module: Module) {
    this.storage.get('_modules').then((values) => {
      if (values == null) {
        this.storage.set('_modules', [module]);
      } else {
        values.push(module);

        this.storage.set('_modules', values);
      }
    });
  }

  delete(module: Module) {
    this.storage.get('_modules').then((values) => {
      if (values != null) {
        for (let i = 0; i < values.length; i++) {
          let value = new Module(values[i]._code, values[i]._name);

          if (module.code == value.code && module.name == value.name) {
            values.splice(i, 1);
          }
        }

        this.storage.set('_modules', values);
      }
    });
  }

  findAll() {
    let modules = [];

    this.storage.get('_modules').then((values) => {
      if (values != null) {
        for (let i = 0; i < values.length; i++) {
          modules.push(new Module(values[i]._code, values[i]._name));
        }
      }
    });

    return modules;
  }
}
