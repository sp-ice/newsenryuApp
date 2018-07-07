import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YomuPage } from '../yomu/yomu';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {    
  }

  yomuTapped(event) {
    this.navCtrl.push(YomuPage);
  }
}
