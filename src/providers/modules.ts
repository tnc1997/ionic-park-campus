import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Module} from '../models/module';

@Injectable()
export class ModuleProvider {
  constructor(public http: Http, public storage: Storage) {

  }

  createModule(module: Module) {
    this.storage.get('_modules').then((values) => {
      if (values == null) {
        this.storage.set('_modules', [module]);
      } else {
        values.push(module);

        this.storage.set('_modules', values);
      }
    });
  }

  deleteModule(module: Module) {
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
    return new Promise(((resolve, reject) => {
      this.storage.get('_modules').then((values) => {
        let modules = [];

        if (values != null && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
            modules.push(new Module(values[i]._code, values[i]._name));
          }
        }

        resolve(modules);
      }, (error) => {
        reject(error);
      });
    }));
  }

  findByCode(code: String) {
    return new Promise(((resolve, reject) => {
      this.storage.get('_modules').then((values) => {
        let module;

        if (values != null && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
            if (values[i]._code == code) {
              module = new Module(values[i]._code, values[i]._name);
            }
          }
        }

        resolve(module);
      }, (error) => {
        reject(error);
      });
    }));
  }
}
