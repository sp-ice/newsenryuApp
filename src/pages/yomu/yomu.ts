import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordServiceProvider } from '../../providers/word-service/word-service';
import { SenryuServiceProvider } from '../../providers/senryu-service/senryu-service';
import { Word } from '../../models/word';
import { Senryu } from '../../models/senryu';
import { AppSettings } from '../../app/app.settings';

/**
 * Generated class for the YomuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'yomu'
})
@Component({
  selector: 'page-yomu',
  templateUrl: 'yomu.html',
})
export class YomuPage {
  words: Array<Word>;
  senryu: Senryu;
  focus_idx: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wordService :WordServiceProvider, private senryuService :SenryuServiceProvider, public loadingCtrl: LoadingController) {
    this.senryu = <Senryu>{};
  }

  ionViewCanEnter(): boolean{
    console.log("!?!?"+AppSettings.isLogin());
    if (AppSettings.isLogin()) {
      return true;
    } else {
      // setTimeout(() => this.navCtrl.push('login'), 0);
      return false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YomuPage');
  }

  inputFocused(event, idx) {
    this.focus_idx = idx;
    console.log(idx);

    let len = (this.focus_idx == 2) ? '7' : '5';
    this.wordService.getWords(len).subscribe(
      pagingObj => {
        this.words = pagingObj.data;
        console.log(this.words);
      }, 
      err => console.log(err),
      () => {}
    );
  }

  wordTapped(event, word) {
    console.log(word);
    if(this.focus_idx == 1){
      this.senryu.kami_id=word.id;
      this.senryu.kami_ku=word.word;
    }else if(this.focus_idx == 2){
      this.senryu.naka_id=word.id;
      this.senryu.naka_ku=word.word;
    }else if(this.focus_idx == 3){
      this.senryu.simo_id=word.id;
      this.senryu.simo_ku=word.word;
    }
  }

  yomuTapped(event) {
    this.loadingCtrl
      let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log(this.senryu);
    this.senryuService.postSenryu(this.senryu).subscribe(
      storedSenryu => {
        loading.dismiss();
        console.log(storedSenryu);
        this.navCtrl.pop();
      }, 
      err => console.log(err),
      () => {}
    );
  }

}
