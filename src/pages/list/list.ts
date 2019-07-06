import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { YomuPage } from '../yomu/yomu';
import { PagesServiceProvider } from '../../providers/pages-service/pages-service';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppSettings } from '../../app/app.settings';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public pagesService: PagesServiceProvider) {    
  }

  ionViewCanEnter(): Promise<any>{
    //ログインチェック
    return new Promise((resolve, reject) => {
      if (AppSettings.isLogin()) resolve(true);
      let _url = AppSettings.API_ENDPOINT_LOGINED+'check';
      console.log("cehckLogin:"+_url);
      this.http.get(_url, { observe: 'response' }).subscribe(
        (res: HttpResponse<any>) => {
          console.log("res.status:"+res.status);
          if (res.status == 200 ){
            AppSettings.setLogin(true);
            this.pagesService.enableLoginedMenu();//メニューを追加
          } else {
            AppSettings.setLogin(false);
          }
          resolve(true);
        },
        err => {
          console.log(err);
          AppSettings.setLogin(false);
          //###
          AppSettings.setLogin(true);
          this.pagesService.enableLoginedMenu();//メニューを追加
          //###
          resolve(true);
        },
        () => {}
      );
    });
  }

  yomuTapped(event) {
    this.navCtrl.push('yomu');
  }
}
