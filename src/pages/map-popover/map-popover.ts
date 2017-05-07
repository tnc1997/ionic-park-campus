import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-map-popover',
  templateUrl: 'map-popover.html'
})

/**
 * The map popover page contains the settings used to control the map page. Through this page, the user is able to
 * clear the currently displayed directions in addition to toggling the map overlay.
 */
export class MapPopover {
  directionsRenderer: any;
  displayOverlay: Boolean;
  map: any;
  mapPolygons: any[];
  toggleInitialized: Boolean = false;

  /**
   * Initialises the directions renderer, map, map polygons and display overlay variables.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {NavParams} navParams stores the parameters passed between pages during navigation
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.directionsRenderer = navParams.get("directionsRenderer");
    this.map = navParams.get("map");
    this.mapPolygons = navParams.get("mapPolygons");

    this.displayOverlay = this.mapPolygons[0].getMap() != null;

    setTimeout(() => this.toggleInitialized = true, 500);
  }

  /**
   * Clears the currently displayed directions by nullifying the map of the directions renderer.
   */
  clearDirections() {
    this.directionsRenderer.setMap(null);
  }

  /**
   * If the toggle is initialised and display overlay is set to true then add each building polygon to the map in
   * addition to each room polygon on floor number zero. If only the toggle is initialised then remove all of the
   * polygons displayed by nullifying their map.
   */
  onOverlayToggleChange() {
    if (this.toggleInitialized && this.displayOverlay) {
      this.mapPolygons.forEach((polygon) => {
        if (polygon.type == "building" || (polygon.type == "room" && polygon.floor == 0)) {
          polygon.setMap(this.map);
        }
      });
    } else if (this.toggleInitialized) {
      this.mapPolygons.forEach((polygon) => {
        polygon.setMap(null);
      });
    }
  }
}
