import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {EntityList} from '../entity-list/entity-list';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
  entities = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.entities = [{name: "Lectures"}, {name: "Modules"}];
  }

  openEntity(entity) {
    this.navCtrl.push(EntityList, {
      entity: entity
    });
  }
}
