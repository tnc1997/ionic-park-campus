import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Buildings} from '../../providers/providers';
import {Building} from '../../models/building';
import {LatLngLiteral, SebmGoogleMap, SebmGoogleMapPolygon} from 'angular2-google-maps/core';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class Map {
  floor: String = 'GROUND';
  popup: Number = 0;
  lat: Number = 51.88694;
  lng: Number = -2.08864;
  zoom: Number = 16;

  // Waterworth background poly
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

  // Waterworth ground floor poly
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

  // Waterworth first floor poly
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
  ]

  currentBuildings: Building[];

  constructor(public navCtrl: NavController, public buildings: Buildings) {
    this.currentBuildings = buildings.findAll();
  }

  onRoomClick(roomCode: Number) {
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
  }

}
