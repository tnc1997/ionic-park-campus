import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Setting} from '../../models/setting';

@Injectable()
export class SettingProvider {
  constructor(public http: Http, public storage: Storage) {

  }

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

  findAll() {
    let settings = [];

    this.storage.get('_settings').then((values) => {
      if (values != null) {
        for (let i = 0; i < values.length; i++) {
          settings.push(new Setting(values[i]._key, values[i]._value));
        }
      }
    });

    return settings;
  }
}
