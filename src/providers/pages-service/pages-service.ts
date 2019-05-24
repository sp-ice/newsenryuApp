import { Injectable } from '@angular/core';

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
  private pages:Array<{title: string, component: any}> = [
    { title: '最新の川柳', component: ListPage },
    { title: ' 一句詠む', component: 'yomu' },
    // { title: '自分が詠んだ川柳', component: MinePage },
    // { title: 'イイネした川柳', component: LikedPage },
    // { title: 'ログイン', component: LoginPage },
  ];
  
  constructor() {
  }

  getPages() {
    return this.pages;
  }

  enableLoginedMenu() {
    this.pages.push({ title: '自分が詠んだ川柳', component: MinePage });
    this.pages.push({ title: 'イイネした川柳', component: LikedPage });
  }

}
