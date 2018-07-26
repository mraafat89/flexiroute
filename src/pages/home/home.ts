import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlexiRouter } from '../../models/FlexiRouter';
import { Events } from 'ionic-angular';

declare var google;
var countries = {
        'au': {
          center: {lat: -25.3, lng: 133.8},
          zoom: 4
        },
        'br': {
          center: {lat: -14.2, lng: -51.9},
          zoom: 3
        },
        'ca': {
          center: {lat: 62, lng: -110.0},
          zoom: 3
        },
        'fr': {
          center: {lat: 46.2, lng: 2.2},
          zoom: 5
        },
        'de': {
          center: {lat: 51.2, lng: 10.4},
          zoom: 5
        },
        'mx': {
          center: {lat: 23.6, lng: -102.5},
          zoom: 4
        },
        'nz': {
          center: {lat: -40.9, lng: 174.9},
          zoom: 5
        },
        'it': {
          center: {lat: 41.9, lng: 12.6},
          zoom: 5
        },
        'za': {
          center: {lat: -30.6, lng: 22.9},
          zoom: 5
        },
        'es': {
          center: {lat: 40.5, lng: -3.7},
          zoom: 5
        },
        'pt': {
          center: {lat: 39.4, lng: -8.2},
          zoom: 6
        },
        'us': {
          center: {lat: 37.1, lng: -95.7},
          zoom: 3
        },
        'uk': {
          center: {lat: 54.8, lng: -4.6},
          zoom: 5
        }
      };
var countryRestrict = {'country': 'us'};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  preferences = new Object({time:0,safety:0, cal:0, cost:0});

  constructor(public navCtrl: NavController, public events: Events) {}
    ionViewDidLoad(){
    this.initMap();
    this.getInitialPreferences();
    this.events.subscribe('preferences', (preferences)=> this.preferences = preferences);
  }
  getInitialPreferences(){
    // TODO: read them from storage/profile info
    (this.preferences as any).time =4;
    (this.preferences as any).safety = 2;
    (this.preferences as any).cal = 1;
    (this.preferences as any).cost = 3;
  }
  initMap(){
    var inputFrom = document.getElementById('inputFrom').getElementsByTagName('input')[0];
    var inputTo = document.getElementById('inputTo').getElementsByTagName('input')[0];
    var placeFrom;
    var placeTo;
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: countries['us'].zoom,
      center: countries['us'].center,
      disableDefaultUI: true
    });
    this.directionsDisplay.setMap(map);
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, {componentRestrictions: countryRestrict});
    var autocompleteTo = new google.maps.places.Autocomplete(inputTo, {componentRestrictions: countryRestrict});
    var markerFrom = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      label: 'A'
    });
    markerFrom.setVisible(false);
    var markerTo = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      label: 'B'
    });
    markerTo.setVisible(false);
    autocompleteFrom.addListener('place_changed', function(){
      markerFrom.setVisible(false);
      placeFrom = autocompleteFrom.getPlace();
      if (!placeFrom.geometry) {
        window.alert("No details available for input: '" + placeFrom.name + "'");
        return;
      }
      if (placeFrom.geometry.viewport) {
        map.fitBounds(placeFrom.geometry.viewport);
      } else {
        map.setCenter(placeFrom.geometry.location);
        map.setZoom(13);
      }
      markerFrom.setPosition(placeFrom.geometry.location);
      markerFrom.setVisible(true);
      fitBoundsToVisibleMarkers();
    });
    autocompleteTo.addListener('place_changed', function(){
      markerTo.setVisible(false);
      placeTo = autocompleteTo.getPlace();
      if (!placeTo.geometry) {
        window.alert("No details available for input: '" + placeTo.name + "'");
        return;
      }
      if (placeTo.geometry.viewport) {
        map.fitBounds(placeTo.geometry.viewport);
      } else {
        map.setCenter(placeTo.geometry.location);
        map.setZoom(13);
      }
      markerTo.setPosition(placeTo.geometry.location);
      markerTo.setVisible(true);
      fitBoundsToVisibleMarkers();
    });

    var btn = document.getElementById("btnFlexiRouteMe");
    btn.addEventListener("click", (e:Event) => {
      console.log(placeFrom.geometry.location.lat());
      var originLatLon = {lat: placeFrom.geometry.location.lat(), lon: placeFrom.geometry.location.lng()};
      var destnLatLon = {lat: placeTo.geometry.location.lat(), lon: placeTo.geometry.location.lng()};
      var flexiRouter = new FlexiRouter(originLatLon, destnLatLon, this.preferences);
      flexiRouter.route();
    });
    function fitBoundsToVisibleMarkers() {
      var bounds = new google.maps.LatLngBounds();
      if(markerFrom.getVisible())
        bounds.extend(markerFrom.getPosition());
      if(markerTo.getVisible())
        bounds.extend(markerTo.getPosition());
      map.fitBounds(bounds);
    }
  }
}
