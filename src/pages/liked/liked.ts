import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettings } from '../../app/app.settings';

/**
 * Generated class for the LikedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liked',
  templateUrl: 'liked.html',
})
export class LikedPage {
  modeGetSenryu: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.modeGetSenryu=AppSettings.MODE_GET_SENRYU_LIKED;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikedPage');
  }

}
