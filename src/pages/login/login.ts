import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AppSettings } from '../../app/app.settings';
// import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithTwitter() {
    // this.authService.signInWithTwitter().then( result => {
    //   console.log(result);
    //   if (result.credential){
    //           let tw_credential = <any> result;
    //           let token = tw_credential.accessToken;
    //           let secret = tw_credential.secret;
    //           console.log(token,secret);
    //         }
    //         let user = result.user;
    //         console.log(user);
    // }).catch(function(error) {
    //       // Handle Errors here.
    //   alert(error.message);
    // });
    location.href = AppSettings.AUTH_ENDPOINT_TWITTER;
  }

}
