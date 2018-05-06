import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { YomuPage } from '../pages/yomu/yomu';
import { MinePage } from '../pages/mine/mine';
import { LikedPage } from '../pages/liked/liked';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SenryuServiceProvider } from '../providers/senryu-service/senryu-service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WordServiceProvider } from '../providers/word-service/word-service';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    YomuPage,
    MinePage,
    LikedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    YomuPage,
    MinePage,
    LikedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SenryuServiceProvider,
    HttpClientModule,
    WordServiceProvider
  ]
})
export class AppModule {}
