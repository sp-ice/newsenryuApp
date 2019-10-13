import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ListPage } from '../../pages/list/list';
// import { YomuPage } from '../../pages/yomu/yomu';
import { MinePage } from '../../pages/mine/mine';
import { LikedPage } from '../../pages/liked/liked';
// import { LoginPage } from '../../pages/login/login';

import { AppSettings } from '../../app/app.settings';

@Injectable()
export class PagesServiceProvider {
  private pages:Array<{title: string, component: any, isSelected:boolean}> = [];
  
  constructor(public events: Events, public http:HttpClient) {
    this.eanableDefaultMenu('list');
  }

  getPages() {
    return this.pages;
  }

  eanableDefaultMenu(pageName:String) {
    this.pages = [
      { title: '最新の川柳', component: 'list', isSelected:('list'==pageName)},
      { title: 'ログイン', component: 'login', isSelected:('login'==pageName) },
    ];
    this.events.publish('updateMenu', this.pages);
  }

  enableLoginedMenu(pageName:String) {
    this.pages = [
      { title: '最新の川柳', component: 'list', isSelected:('list'==pageName) },
      { title: ' 一句詠む', component: 'yomu', isSelected:('yomu'==pageName) },
      { title: '自分が詠んだ川柳', component: 'mine', isSelected:('mine'==pageName) },
      { title: 'イイネした川柳', component: 'liked', isSelected:('liked'==pageName) }
    ];
    this.events.publish('updateMenu', this.pages);
  }

  changePage(component:string) {
    this.pages.map( p => {
      p['isSelected'] = (component === p.component);
    });
  }

  checkLoginAndUpdateMenu(pageName:String):Promise<any> {
    return new Promise((resolve, reject) => {
      if (AppSettings.isLogin()) resolve(true);
      let _url = AppSettings.API_ENDPOINT_LOGINED+'check';
      console.log("cehckLogin:"+_url);
      this.http.get(_url, { observe: 'response' }).subscribe(
        (res: HttpResponse<any>) => {
          console.log("res.status:"+res.status);
          if (res.status == 200 ){
            AppSettings.setLogin(true);
            this.enableLoginedMenu(pageName);
          } else {
            AppSettings.setLogin(false);
          }
          resolve(true);
        },
        err => {
          console.log(err);
          if (AppSettings.FLG_DEBUG) {
            //無理やりログイン状態で表示
            AppSettings.setLogin(true);
            this.enableLoginedMenu(pageName);
          } else {
            AppSettings.setLogin(false);
            this.eanableDefaultMenu(pageName);
          }
          resolve(true);
        },
        () => {}
      );
    });
  }

}
