import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})


export class PreferencesPage {
  preferences: any;
  constructor(public navCtrl: NavController) {
  	this.rangeSafety = 2;
  	this.rangeCost = 3;
  	this.rangeTime = 4;
  	this.rangeCal = 1;
  	this.savePreferences();

  }
  savePreferences() { 	
  	//this.preferences.safety = this.rangeSafety;
  	//this.preferences.cost = this.rangeCost;
  	//this.preferencespreferences.time = this.rangeTime;
  	//this.preferences.cal = this.rangeCal;
  }
  getPreferences() {
  	return new Array(this.rangeSafety, this.rangeCost, this.rangeTime, this.rangeCal);
  }
}
