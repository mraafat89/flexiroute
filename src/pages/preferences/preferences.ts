import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})


export class PreferencesPage {
	rangeSafety: number;
	rangeCost: number;
	rangeTime: number;
	rangeCal: number;
  constructor(public navCtrl: NavController, public events: Events) {
  	this.rangeSafety = 2;
  	this.rangeCost = 3;
  	this.rangeTime = 4;
  	this.rangeCal = 1;
  	this.events.publish('preferences', {safety:this.rangeSafety, cost:this.rangeCost, time:this.rangeTime, cal:this.rangeCal});
  }
  publishPreferences() { 	
		this.events.publish('preferences', {safety:this.rangeSafety, cost:this.rangeCost, time:this.rangeTime, cal:this.rangeCal});
  }
}
