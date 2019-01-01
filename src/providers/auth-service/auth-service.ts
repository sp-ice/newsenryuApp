import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private user: firebase.User;
  
  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');
    afAuth.authState.subscribe(user => {
			this.user = user;
		});
  }

  signInWithTwitter() {
		console.log('Sign in with twitter');
		return this.oauthSignIn(new firebase.auth.TwitterAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      console.log('signin with popup');
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      console.log('signin with redirect');
      // return this.afAuth.auth.signInWithRedirect(provider)
      // .then(() => {
      //   return this.afAuth.auth.getRedirectResult().then( result => {
      //     console.log(result);
      //     if (result.credential){
      //       // let token = result.credential.token;
      //       // let secret = result.credential.secret;
      //       // console.log(token,secret);
      //       console.log(result.credential);
      //     }
      //     let user = result.user;
      //     console.log(user);
      //   }).catch(function(error) {
      //     // Handle Errors here.
      //     alert(error.message);
      //   });
      // });
    }
  }

}
