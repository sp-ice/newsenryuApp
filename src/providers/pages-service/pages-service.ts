import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { ListPage } from '../../pages/list/list';
import { YomuPage } from '../../pages/yomu/yomu';
import { MinePage } from '../../pages/mine/mine';
import { LikedPage } from '../../pages/liked/liked';
// import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PagesServiceProvider {
  private pages:Array<{title: string, component: any, isSelected:boolean}> = [];
  
  constructor(public events: Events) {
    this.eanableDefaultMenu();
  }

  getPages() {
    return this.pages;
  }

  eanableDefaultMenu() {
    this.pages = [
      { title: '最新の川柳', component: 'list', isSelected:true},
      { title: ' 一句詠む', component: 'yomu', isSelected:false },
      { title: 'ログイン', component: 'login', isSelected:false },
    ];
    this.events.publish('updateMenu', this.pages);
  }

  enableLoginedMenu() {
    this.pages = [
      { title: '最新の川柳', component: 'list', isSelected:true },
      { title: ' 一句詠む', component: 'yomu', isSelected:false },
      { title: '自分が詠んだ川柳', component: MinePage, isSelected:false },
      { title: 'イイネした川柳', component: LikedPage, isSelected:false }
    ];
    this.events.publish('updateMenu', this.pages);
  }

  changePage(component:string) {
    this.pages.map( p => {
      p['isSelected'] = (component === p.component);
    });
  }

}
