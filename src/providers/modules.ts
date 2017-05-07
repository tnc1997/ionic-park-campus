import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Lecture} from '../models/lecture';
import {Module} from '../models/module';
import {LectureProvider} from './providers';

@Injectable()

/**
 * Used by the application to interact with the modules stored on the user's device.
 */
export class ModuleProvider {
  /**
   * Stores an instance of the lecture provider class to be used by the module provider.
   */
  lectureProvider: LectureProvider;

  /**
   * @param {Storage} storage the class containing methods which facilitate interaction with the user's storage
   */
  constructor(public storage: Storage) {
    this.lectureProvider = new LectureProvider(storage);
  }

  /**
   * Takes the provided module and uses Ionic Storage to add it to the device's storage.
   *
   * @param {Module} module the module to add to the storage
   */
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

  /**
   * Takes the provided module and uses Ionic Storage to remove it from the device's storage.
   *
   * @param {Module} module the module to remove from the storage
   */
  deleteModule(module: Module) {
    this.storage.get('_modules').then((values) => {
      if (values != null) {
        for (let i = 0; i < values.length; i++) {
          let value = new Module(values[i]._code, values[i]._name);

          if (module.code == value.code && module.name == value.name) {
            this.lectureProvider.findByModule(module).then((values: Lecture) => {
              this.lectureProvider.deleteLecture(values);
            });

            values.splice(i, 1);
          }
        }

        this.storage.set('_modules', values);
      }
    });
  }

  /**
   * Uses Ionic Storage to find all modules stored in the device's storage.
   *
   * @returns {Promise} contains the modules retrieved from the storage
   */
  findAll() {
    return new Promise((resolve, reject) => {
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
    });
  }

  /**
   * Takes the provided code and uses it to find the associated module stored in the device's storage.
   *
   * @param code the code to search for the module using
   * @returns {Promise} contains the module retrieved from the storage
   */
  findByCode(code: String) {
    return new Promise((resolve, reject) => {
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
    });
  }
}
