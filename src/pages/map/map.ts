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

  ionViewDidLoad() {
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: new google.maps.LatLng(51.88694, -2.08864),
      zoom: 16
    });

    let buildingPolygons = this.polygonProvider.buildingPolygons;

    for (let i = 0; i < buildingPolygons.length; i++) {
      let polygon = new google.maps.Polygon({
        paths: buildingPolygons[i].coordinates,
        strokeColor: buildingPolygons[i].color,
        strokeOpacity: 0.25,
        fillColor: buildingPolygons[i].color,
        fillOpacity: 0.50
      });

      polygon.setMap(this.map);
      polygon.addListener("click", (event) => {
        let infoWindow = new google.maps.InfoWindow;
        infoWindow.setContent(this.buildings[Number(buildingPolygons[i].building) - 1].name);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(this.map);
      });
    }

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
      directionsRenderer: this.directionsRenderer
    });
    popover.present();
  }

  updateMapCentre(lat: Number, lng: Number, zoom: Number) {
    this.map.panTo(new google.maps.LatLng(lat, lng));
    this.map.setZoom(zoom);
  }
}
