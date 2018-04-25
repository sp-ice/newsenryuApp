import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { YomuPage } from '../pages/yomu/yomu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SenryuServiceProvider } from '../providers/senryu-service/senryu-service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WordServiceProvider } from '../providers/word-service/word-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    YomuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    YomuPage
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
