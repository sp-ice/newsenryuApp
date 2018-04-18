import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SenryuServiceProvider } from '../../providers/senryu-service/senryu-service';
import { Senryu } from '../../models/senryu';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  senryus: Array<Senryu>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private senryuService: SenryuServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    senryuService.getSenryus().subscribe(
      pagingObj => {
        this.senryus = pagingObj.data;
        console.log(this.senryus);
      }, 
      err => console.log(err),
      () => {}
    );
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
