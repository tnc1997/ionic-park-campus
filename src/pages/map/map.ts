import {Component, ElementRef, ViewChild} from '@angular/core';
// import {LatLngLiteral, SebmGoogleMap, SebmGoogleMapPolygon} from 'angular2-google-maps/core';
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
   
  /*floor: String = 'GROUND';
  
  popup: Number = 0;
  
  lat: Number = 51.88694;
  lng: Number = -2.08864;
  zoom: Number = 16;
  
  currentBuildings: Building[];

  paths: Array<LatLngLiteral> = [
    {lat: 51.88832, lng: -2.08878},
    {lat: 51.88833, lng: -2.08868},
    {lat: 51.888275, lng: -2.088663},
    {lat: 51.888295, lng: -2.088463},
    {lat: 51.888347, lng: -2.088475},
    {lat: 51.888357, lng: -2.088373},
    {lat: 51.888186, lng: -2.088330},
    {lat: 51.888174, lng: -2.088457},
    {lat: 51.888154, lng: -2.088452},
    {lat: 51.888140, lng: -2.088606},
    {lat: 51.888160, lng: -2.088611},
    {lat: 51.888147, lng: -2.088740}
  ]

  poly001: Array<LatLngLiteral> = [
    {lat: 51.888347, lng: -2.088475},
    {lat: 51.888357, lng: -2.088373},
    {lat: 51.888186, lng: -2.088330},
    {lat: 51.888176, lng: -2.088434}
  ]

  poly002: Array<LatLngLiteral> = [
    {lat: 51.888201, lng: -2.088754},
    {lat: 51.888227, lng: -2.088469},
    {lat: 51.888154, lng: -2.088452},
    {lat: 51.888140, lng: -2.088606},
    {lat: 51.888160, lng: -2.088611},
    {lat: 51.888147, lng: -2.088740}
  ]

  poly003: Array<LatLngLiteral> = [
    {lat: 51.88832, lng: -2.08878},
    {lat: 51.88833, lng: -2.08868},
    {lat: 51.888256, lng: -2.088661},
    {lat: 51.888253, lng: -2.088690},
    {lat: 51.888202, lng: -2.088678},
    {lat: 51.888197, lng: -2.088753}
  ]

  poly004: Array<LatLngLiteral> = [
    {lat: 51.888275, lng: -2.088663},
    {lat: 51.888279, lng: -2.088625},
    {lat: 51.888250, lng: -2.088618},
    {lat: 51.888246, lng: -2.088656}
  ]

  poly005: Array<LatLngLiteral> = [
    {lat: 51.888250, lng: -2.088618},
    {lat: 51.888240, lng: -2.088617},
    {lat: 51.888236, lng: -2.088655},
    {lat: 51.888246, lng: -2.088656}
  ]

  poly006: Array<LatLngLiteral> = [
    {lat: 51.888279, lng: -2.088625},
    {lat: 51.888285, lng: -2.088562},
    {lat: 51.888247, lng: -2.088549},
    {lat: 51.888236, lng: -2.088655}
  ]

  poly011: Array<LatLngLiteral> = [
    {lat: 51.888292, lng: -2.088494},
    {lat: 51.888295, lng: -2.088463},
    {lat: 51.888257, lng: -2.088450},
    {lat: 51.888254, lng: -2.088486}
  ]

  poly101: Array<LatLngLiteral> = [
    {lat: 51.888213, lng: -2.088622},
    {lat: 51.888240, lng: -2.088344},
    {lat: 51.888186, lng: -2.088330},
    {lat: 51.888174, lng: -2.088457},
    {lat: 51.888154, lng: -2.088452},
    {lat: 51.888140, lng: -2.088606},
    {lat: 51.888160, lng: -2.088611}
  ]

  poly103: Array<LatLngLiteral> = [
    {lat: 51.88832, lng: -2.08878},
    {lat: 51.88833, lng: -2.08868},
    {lat: 51.888212, lng: -2.088650},
    {lat: 51.888213, lng: -2.088622},
    {lat: 51.888160, lng: -2.088611},
    {lat: 51.888147, lng: -2.088740}
  ]

  poly104: Array<LatLngLiteral> = [
    {lat: 51.888275, lng: -2.088663},
    {lat: 51.888286, lng: -2.088549},
    {lat: 51.888250, lng: -2.088537},
    {lat: 51.888237, lng: -2.088655}
  ]

  poly113: Array<LatLngLiteral> = [
    {lat: 51.888292, lng: -2.088494},
    {lat: 51.888295, lng: -2.088463},
    {lat: 51.888257, lng: -2.088450},
    {lat: 51.888254, lng: -2.088486}
  ]

  poly114: Array<LatLngLiteral> = [
    {lat: 51.888347, lng: -2.088475},
    {lat: 51.888357, lng: -2.088373},
    {lat: 51.888267, lng: -2.088351},
    {lat: 51.888257, lng: -2.088450}
  ]*/

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
        
  /*onRoomClick(roomCode: Number) {
    this.popup = roomCode;
  }

  onBuildingChange(buildingCode: string) {
    for (let building of this.currentBuildings) {
      if (buildingCode == building.code) {
        this.lat = building.lat;
        this.lng = building.lng;
        this.zoom = 19;

        break;
      }
    }
  }*/
   
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

      this.mapPolygons.push(polygon);
    }
  }

  updateMapCentre(lat: Number, lng: Number, zoom: Number) {
    this.map.panTo(new google.maps.LatLng(lat, lng));
    this.map.setZoom(zoom);
  }
}
