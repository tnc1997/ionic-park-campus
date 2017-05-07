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

/**
 * The map page contains a Google Map, covering the entire screen, which is centred on the Park Campus.
 */
export class Map {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapPolygons: any[];

  directionsRenderer: any;
  directionsService: any;

  buildings: Building[];

  /**
   * Fetches a list of buildings to be displayed in the select box, then checks to see if a building has been
   * passed into the constructor via the navigation parameters. If a building has been specified then the
   * {@link onBuildingChange} method is called, passing in the building.
   *
   * @param {ModalController} modalCtrl controls the displaying of modal pages in the application
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {NavParams} navParams stores the parameters passed between pages during navigation
   * @param {PopoverController} popoverCtrl controls the displaying of popovers in the application
   * @param {BuildingProvider} buildingProvider contains CRUD methods to access building related data
   * @param {PolygonProvider} polygonProvider contains methods to access the stored polygons
   */
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public buildingProvider: BuildingProvider, public polygonProvider: PolygonProvider) {
    buildingProvider.queryBuildings().then((values) => {
      this.buildings = <Array<Building>> values;

      if (navParams.get("building") != null) {
        this.onBuildingChange((<Building> navParams.get("building")).id);
      }
    });
  }

  /**
   * Takes an origin and destination and calculates a route between them using the Google Maps JavaScript API.
   *
   * @param {Object} origin the point to calculate directions from
   * @param {Object} destination the point to calculate directions to
   * @see <a href="https://developers.google.com/maps/documentation/javascript/directions">Directions Service</a>
   */
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

  /**
   * Takes an array containing polygons and adds them to the map using the Google Maps JavaScript API. If the polygon
   * is of a building then the object is assigned a property type of building, however if the polygon is of a room then
   * the object is assigned a property type of room and a property floor of the floor the room is located on, which is
   * found by taking the first number in the numerical section of the room code. Each polygon is then assigned a click
   * event which opens an info window displaying more information when the user clicks on the polygon.
   *
   * @param polygons an array of polygons to be added to the map
   * @see <a href="https://developers.google.com/maps/documentation/javascript/shapes#polygons">Polygons</a>
   */
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

  /**
   * When the view has finished loading, the map is created using the Google Maps JavaScript API. Once the map has
   * been created, the polygons are added to it via the {@link showPolygons} method. Finally, if an origin and
   * destination have been passed via the navigation parameters then the directions between these two points are
   * calculated using the {@link calculateRoute} method.
   *
   * @see <a href="https://developers.google.com/maps/documentation/javascript/tutorial">Getting Started</a>
   */
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

  /**
   * Iterates through the buildings array to find which building was selected by the user and then calls the
   * {@link updateMapCentre} method, passing in the latitude and longitude of the building and the zoom level.
   *
   * @param {Number} buildingId the id of the building selected by the user
   */
  onBuildingChange(buildingId: Number) {
    for (let i = 0; i < this.buildings.length; i++) {
      let building: Building = this.buildings[i];

      if (buildingId == building.id) {
        this.updateMapCentre(Number(building.lat + ""), Number(building.lng + ""), 19);

        break;
      }
    }
  }

  /**
   * Updates the room overlays to match the newly selected floor. All of the room polygons are removed from the map
   * and then only the rooms matching the new floor are added back to the map afterwards.
   *
   * @param {Number} floor the floor number selected by the user
   */
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

  /**
   * Creates a modal, which allows the user to enter directions to be calculated and displayed on the map. Upon
   * dismissal of the modal page, the {@link calculateRoute} method is called, passing in the origin and destination.
   */
  onClickNavigation() {
    let createModal = this.modalCtrl.create(MapDirections);
    createModal.onDidDismiss((entity: {origin: {lat: Number, lng: Number}, destination: {lat: Number, lng: Number}}) => {
      if (entity != null) {
        this.calculateRoute(entity.origin, entity.destination);
      }
    });
    createModal.present();
  }

  /**
   * Creates a popover, which allows the user to edit the settings of the map page. These settings are shown and
   * discussed in greater detail on the map popover page.
   *
   * @see {@link MapPopover}
   */
  presentPopover() {
    let popover = this.popoverCtrl.create(MapPopover, {
      directionsRenderer: this.directionsRenderer,
      map: this.map,
      mapPolygons: this.mapPolygons
    });
    popover.present();
  }

  /**
   * Initialises the map polygons array and then calls the {@link generatePolygons} method with the building polygons
   * and then subsequently the room polygons.
   */
  showPolygons() {
    this.mapPolygons = [];

    this.generatePolygons(this.polygonProvider.buildingPolygons);
    this.generatePolygons(this.polygonProvider.roomPolygons);
  }

  /**
   * Updates the centre of the map based on the provided latitude, longitude and zoom level.
   *
   * @param {Number} lat the latitude of the new centre of the map
   * @param {Number} lng the longitude of the new centre of the map
   * @param {Number} zoom the zoom level of the new centre of the map
   */
  updateMapCentre(lat: Number, lng: Number, zoom: Number) {
    this.map.panTo(new google.maps.LatLng(lat, lng));
    this.map.setZoom(zoom);
  }
}
