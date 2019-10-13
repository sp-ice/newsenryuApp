import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettings } from '../../app/app.settings';
import { PagesServiceProvider } from '../../providers/pages-service/pages-service';

/**
 * Generated class for the LikedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'liked'
})
@Component({
  selector: 'page-liked',
  templateUrl: 'liked.html',
})
export class LikedPage {
  modeGetSenryu: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pagesService: PagesServiceProvider) {
    this.modeGetSenryu=AppSettings.MODE_GET_SENRYU_LIKED;
  }

  ionViewCanEnter(): Promise<any>{
    //ログインチェック
    return this.pagesService.checkLoginAndUpdateMenu('liked');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikedPage');
    if ( !AppSettings.isLogin() ) {
      this.navCtrl.setRoot('login');
    }
  }

  yomuTapped(event) {
    this.navCtrl.push('yomu');
  }

}
