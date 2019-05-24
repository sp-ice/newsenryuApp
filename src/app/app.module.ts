import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { YomuPage } from '../pages/yomu/yomu';
import { MinePage } from '../pages/mine/mine';
import { LikedPage } from '../pages/liked/liked';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SenryuServiceProvider } from '../providers/senryu-service/senryu-service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WordServiceProvider } from '../providers/word-service/word-service';
import { PagesServiceProvider } from '../providers/pages-service/pages-service';

import { ComponentsModule } from '../components/components.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppSettings } from './app.settings';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
// import { ListPageModule } from '../pages/list/list.module';
import { LoginPageModule } from '../pages/login/login.module';
import { YomuPageModule } from '../pages/yomu/yomu.module';
import { MinePageModule } from '../pages/mine/mine.module';
import { LikedPageModule } from '../pages/liked/liked.module';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    // YomuPage,
    MinePage,
    LikedPage
    // LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG), 
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    // YomuPage,
    MinePage,
    LikedPage
    // LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SenryuServiceProvider,
    HttpClientModule,
    WordServiceProvider,
    PagesServiceProvider,
    AngularFireAuth,
    AuthServiceProvider
  ]
})
export class AppModule {}
