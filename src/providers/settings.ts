import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Setting} from '../models/setting';

@Injectable()

/**
 * Used by the application to interact with the settings stored on the user's device.
 */
export class SettingProvider {
  /**
   * @param {Storage} storage the class containing methods which facilitate interaction with the user's storage
   */
  constructor(public storage: Storage) {

  }

  /**
   * Takes the provided setting and uses Ionic Storage to add it to the device's storage.
   *
   * @param {Setting} setting the setting to add to the storage
   */
  createSetting(setting: Setting) {
    this.storage.get('_settings').then((values) => {
      if (values == null) {
        this.storage.set('_settings', [setting]);
      } else {
        values.push(setting);

        this.storage.set('_settings', values);
      }
    });
  }

  /**
   * Takes the provided setting and uses Ionic Storage to remove it from the device's storage.
   *
   * @param {Setting} setting the setting to remove from the storage
   */
  deleteSetting(setting: Setting) {
    this.storage.get('_settings').then((values) => {
      if (values != null) {
        for (let i = 0; i < values.length; i++) {
          let value = new Setting(values[i]._key, values[i]._value);

          if (setting.key == value.key && setting.value == value.value) {
            values.splice(i, 1);
          }
        }

        this.storage.set('_settings', values);
      }
    });
  }

  /**
   * Uses Ionic Storage to find all settings stored in the device's storage.
   *
   * @returns {Promise} contains the settings retrieved from the storage
   */
  findAll() {
    return new Promise(((resolve, reject) => {
      this.storage.get('_settings').then((values) => {
        let settings = [];

        if (values != null && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
            settings.push(new Setting(values[i]._key, values[i]._value));
          }
        }

        resolve(settings);
      }, (error) => {
        reject(error);
      });
    }));
  }
}
