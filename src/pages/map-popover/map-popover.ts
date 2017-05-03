import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-map-popover',
  templateUrl: 'map-popover.html'
})
export class MapPopover {
  directionsRenderer: any;
  displayOverlay: Boolean;
  map: any;
  mapPolygons: any[];
  toggleInitialized: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.directionsRenderer = navParams.get("directionsRenderer");
    this.map = navParams.get("map");
    this.mapPolygons = navParams.get("mapPolygons");

    this.displayOverlay = this.mapPolygons[0].getMap() != null;

    setTimeout(() => this.toggleInitialized = true, 500);
  }

  clearDirections() {
    this.directionsRenderer.setMap(null);
  }

  onOverlayToggleChange() {
    if (this.toggleInitialized && this.displayOverlay) {
      this.mapPolygons.forEach((polygon) => polygon.setMap(this.map));
    } else if (this.toggleInitialized) {
      this.mapPolygons.forEach((polygon) => polygon.setMap(null));
    }
  }
}
