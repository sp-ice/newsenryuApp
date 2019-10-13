import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordServiceProvider } from '../../providers/word-service/word-service';
import { SenryuServiceProvider } from '../../providers/senryu-service/senryu-service';
import { Word } from '../../models/word';
import { Senryu } from '../../models/senryu';
import { AppSettings } from '../../app/app.settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PagesServiceProvider } from '../../providers/pages-service/pages-service';

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
  templateUrl: 'yomu.html'
})
export class YomuPage {
  words: Array<Word>;
  senryu: Senryu;
  focus_idx: number;
  next_page_url: string;
  since_id: number;
  hasNextData: boolean;
  error_msgs: Array<String>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private wordService :WordServiceProvider,
              private senryuService :SenryuServiceProvider,
              private loadingCtrl: LoadingController,
              private http:HttpClient,
              private pagesService: PagesServiceProvider
              ) {
    this.senryu = <Senryu>{};
  }

  ionViewCanEnter(): Promise<any>{
    //ログインチェック
    return this.pagesService.checkLoginAndUpdateMenu('yomu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YomuPage');
    if ( !AppSettings.isLogin() ) {
      this.navCtrl.setRoot('login');
    }
  }

  inputFocused(event, idx) {
    this.focus_idx = idx;
    console.log(idx);

    this.error_msgs = [];

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let len = (this.focus_idx == 2) ? '7' : '5';
    this.wordService.getWords(len).subscribe(
      pagingObj => {
        this.words = pagingObj.data;
        this.since_id = this.words[0].id;
        this.next_page_url = pagingObj.next_page_url;
        this.hasNextData=(this.next_page_url!=null);
        console.log(pagingObj);
      }, 
      err => console.log(err),
      () => {
        loader.dismiss();
      }
    );
  }

  loadingNext(): Promise<any> {
    return new Promise((resolve) => {
      let url_next = this.next_page_url;
      if (AppSettings.FLG_DEBUG) {
        url_next = url_next.replace('http://133.130.91.251','http://localhost:8100');
      }
      let len = (this.focus_idx == 2) ? '7' : '5';
      console.log(url_next);
      this.wordService.getWords(len, url_next, this.since_id).subscribe(
        pagingObj => {
          this.words = this.words.concat(pagingObj.data);
          this.next_page_url = pagingObj.next_page_url;
          this.hasNextData=(this.next_page_url!=null);
          console.log(pagingObj);
          resolve();
        }, 
        err => console.log(err),
        () => {}
      );
    })
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
    this.error_msgs = [];
    this.words = [];
    console.log(this.senryu);
    this.senryuService.postSenryu(this.senryu).subscribe(
      storedSenryu => {
        loading.dismiss();
        console.log(storedSenryu);
        if (this,this.navCtrl.length() > 1){
          this.navCtrl.pop();
        } else {
          this.navCtrl.setRoot('list');
        }
        
      }, 
      err => {
        console.log(err);
        if (err.error.hasOwnProperty('word_kami_id')){
          this.error_msgs = this.error_msgs.concat(err.error.word_kami_id);
        }
        if (err.error.hasOwnProperty('word_naka_id')){
          this.error_msgs = this.error_msgs.concat(err.error.word_naka_id);
        }
        if (err.error.hasOwnProperty('word_simo_id')){
          this.error_msgs = this.error_msgs.concat(err.error.word_simo_id);
        }
        console.log(this.error_msgs);
        loading.dismiss();
      },
      () => {}
    );
  }

}
