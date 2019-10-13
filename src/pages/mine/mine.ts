import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YomuPage } from '../yomu/yomu';
import { AppSettings } from '../../app/app.settings';
import { PagesServiceProvider } from '../../providers/pages-service/pages-service';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'mine'
})
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  modeGetSenryu: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pagesService: PagesServiceProvider) {
    console.log('minePage constructor');
    this.modeGetSenryu=AppSettings.MODE_GET_SENRYU_MINE;
  }

  ionViewCanEnter(): Promise<any>{
    //ログインチェック
    return this.pagesService.checkLoginAndUpdateMenu('mine');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
    if ( !AppSettings.isLogin() ) {
      this.navCtrl.setRoot('login');
    }
  }

  yomuTapped(event) {
    this.navCtrl.push('yomu');
  }

}
