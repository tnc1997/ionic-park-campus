import {Component, ElementRef, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {BuildingProvider, PolygonProvider} from '../../providers/providers';
import {Building} from '../../models/building';
import {MapDirections} from '../map-directions/map-directions';
import {MapPopover} from '../map-popover/map-popover';

declare let google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class Map {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapPolygons: any[];

  directionsRenderer: any;
  directionsService: any;

  buildings: Building[];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public buildingProvider: BuildingProvider, public polygonProvider: PolygonProvider) {
    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;

      if (navParams.get("building") != null) {
        this.onBuildingChange((<Building> navParams.get("building")).id);
      }
    });
  }

  calculateRoute(origin: {lat: Number, lng: Number}, destination: {lat: Number, lng: Number}) {
    let request = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      travelMode: google.maps.TravelMode['WALKING']
    };

    let directionsRenderer = this.directionsRenderer, map = this.map;

    this.directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map);
      } else {
        console.log(status);
      }
    });
  }

  generatePolygons(polygons) {
    for (let i = 0; i < polygons.length; i++) {
      let polygon = new google.maps.Polygon({
        paths: polygons[i].coordinates,
        strokeColor: polygons[i].strokeColor,
        strokeOpacity: 1,
        fillColor: polygons[i].fillColor,
        fillOpacity: 1
      });

      if (polygons[i].hasOwnProperty("building")) {
        polygon.type = "building";
      } else if (polygons[i].hasOwnProperty("room")) {
        polygon.type = "room";
        polygon.floor = Number(polygons[i].room.substring(2, 3));
      }

      if (polygon.type == "building" || (polygon.type == "room" && polygon.floor == 0)) {
        polygon.setMap(this.map);
      }

      polygon.addListener("click", (event) => {
        let infoWindow = new google.maps.InfoWindow;

        if (polygon.type == "building") {
          infoWindow.setContent(this.buildings[Number(polygons[i].building) - 1].name);
        } else if (polygon.type == "room") {
          infoWindow.setContent("<h3>" + polygons[i].room + "</h3>" + polygons[i].description);
        }

        infoWindow.setPosition(event.latLng);
        infoWindow.open(this.map);
      });

      this.mapPolygons.push(polygon);
    }
  }

  ionViewDidLoad() {
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: new google.maps.LatLng(51.88694, -2.08864),
      zoom: 16
    });

    this.showPolygons();

    if (this.navParams.get("origin") != null && this.navParams.get("destination") != null) {
      this.calculateRoute(this.navParams.get("origin"), this.navParams.get("destination"));
    }
  }

  onBuildingChange(buildingId: Number) {
    for (let i = 0; i < this.buildings.length; i++) {
      let building: Building = this.buildings[i];

      if (buildingId == building.id) {
        this.updateMapCentre(Number(building.lat + ""), Number(building.lng + ""), 19);

        break;
      }
    }
  }

  onClickFloor(floor: Number) {
    this.mapPolygons.forEach((polygon) => {
      if (polygon.type == "room") {
        polygon.setMap(null);
      }
    });

    this.mapPolygons.forEach((polygon) => {
      if (polygon.type == "room" && polygon.floor == floor) {
        polygon.setMap(this.map);
      }
    });
  }

  onClickNavigation() {
    let createModal = this.modalCtrl.create(MapDirections);
    createModal.onDidDismiss((entity: {origin: {lat: Number, lng: Number}, destination: {lat: Number, lng: Number}}) => {
      if (entity != null) {
        this.calculateRoute(entity.origin, entity.destination);
      }
    });
    createModal.present();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(MapPopover, {
      directionsRenderer: this.directionsRenderer,
      map: this.map,
      mapPolygons: this.mapPolygons
    });
    popover.present();
  }

  showPolygons() {
    this.mapPolygons = [];

    this.generatePolygons(this.polygonProvider.buildingPolygons);
    this.generatePolygons(this.polygonProvider.roomPolygons);
  }

  updateMapCentre(lat: Number, lng: Number, zoom: Number) {
    this.map.panTo(new google.maps.LatLng(lat, lng));
    this.map.setZoom(zoom);
  }
}
