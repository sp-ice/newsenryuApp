import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { ListPage } from '../pages/list/list';
import { PagesServiceProvider } from '../providers/pages-service/pages-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'list';

  pages: Array<{title: string, component: any, isSelected:boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public pagesService: PagesServiceProvider, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    events.subscribe('updateMenu', (pages) => {
      console.log("###updateMenu",pages);
      this.pages = pages;
    });
    pagesService.eanableDefaultMenu('list');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
