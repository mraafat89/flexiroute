import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  inputFrom: ElementRef;

  constructor(public navCtrl: NavController) {}
  ionViewDidLoad(){
    this.initMap();
  }
   initMap() {
    var options = { componentRestrictions: { country: 'usa' }, types: ['geocode'] }
    var inputFrom = document.getElementById('inputFrom').getElementsByTagName('input')[0];
    var inputTo = document.getElementById('inputTo').getElementsByTagName('input')[0];
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: countries['us'].zoom,
      center: countries['us'].center,
      streetViewControl: false
    });
    this.directionsDisplay.setMap(this.map);
    var autocompleteFrom = new google.maps.places.Autocomplete(
      inputFrom, {componentRestrictions: countryRestrict});
    var autocompleteTo = new google.maps.places.Autocomplete(
      inputTo, {componentRestrictions: countryRestrict});
      var places = new google.maps.places.PlacesService(this.map);

   // autocomplete.addListener('place_changed', onPlaceChanged);
  }
    onPlaceChanged(){
      
    }
  calculateAndDisplayRoute() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  }
}
