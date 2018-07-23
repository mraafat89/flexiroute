import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PreferencesPage } from '../preferences/preferences';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = PreferencesPage;
  tab3Root: any = AboutPage;
  constructor(public navCtrl: NavController) {
  }
  
}
