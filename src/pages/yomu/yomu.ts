import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordServiceProvider } from '../../providers/word-service/word-service';
import { Word } from '../../models/word';

/**
 * Generated class for the YomuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yomu',
  templateUrl: 'yomu.html',
})
export class YomuPage {
  words: Array<Word>;
  kami_ku: string;
  naka_ku: string;
  simo_ku: string;
  kami_ku_id: number;
  naka_ku_id: number;
  simo_ku_id: number;
  focus_idx: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wordService :WordServiceProvider) {
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
      this.kami_ku_id=word.id;
      this.kami_ku=word.word;
    }else if(this.focus_idx == 2){
      this.naka_ku_id=word.id;
      this.naka_ku=word.word;
    }else if(this.focus_idx == 3){
      this.simo_ku_id=word.id;
      this.simo_ku=word.word;
    }
  }

}
