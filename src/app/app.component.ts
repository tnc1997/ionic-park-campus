import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Setting} from "../models/setting";
import {Home} from '../pages/home/home';
import {Map} from '../pages/map/map';
import {InstallationPage, MainPage} from '../pages/pages';
import {SettingProvider} from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public settingProvider: SettingProvider) {
    this.initializeApp();

    this.pages = [
      {title: 'Home', component: Home},
      {title: 'Map', component: Map}
    ];

    this.settingProvider.findAll().then((values) => {
      if (values == 0) {
        this.rootPage = InstallationPage;

        this.settingProvider.createSetting(new Setting("setup", true));
      } else {
        this.rootPage = MainPage;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    this.nav.setRoot(page.component);
  }
}
