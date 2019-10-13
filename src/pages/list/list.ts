import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { YomuPage } from '../yomu/yomu';
import { PagesServiceProvider } from '../../providers/pages-service/pages-service';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppSettings } from '../../app/app.settings';

@IonicPage({
  name:'list',
  segment: 'list'
})
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:HttpClient,
              public pagesService: PagesServiceProvider) {    
  }

  ionViewCanEnter(): Promise<any>{
    //ログインチェック
    return this.pagesService.checkLoginAndUpdateMenu('list');
  }

  yomuTapped(event) {
    this.navCtrl.push('yomu');
  }
}
