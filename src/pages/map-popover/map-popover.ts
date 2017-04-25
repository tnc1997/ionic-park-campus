import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Building} from '../../models/building';
import {MapDirections} from '../map-directions/map-directions';

@Component({
  selector: 'page-map-popover',
  templateUrl: 'map-popover.html'
})
export class MapPopover {
  directionsRenderer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.directionsRenderer = navParams.get("directionsRenderer");
  }

  clearDirections() {
    this.directionsRenderer.setMap(null);
  }
}
