import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YomuPage } from '../yomu/yomu';
import { AppSettings } from '../../app/app.settings';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  modeGetSenryu: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.modeGetSenryu=AppSettings.MODE_GET_SENRYU_MINE;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }

  yomuTapped(event) {
    this.navCtrl.push(YomuPage);
  }

}
