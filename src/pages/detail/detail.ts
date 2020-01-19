import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { SenryuServiceProvider } from '../../providers/senryu-service/senryu-service';
import { Senryu } from '../../models/senryu';
import { AppSettings } from '../../app/app.settings';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'detail',
  segment: 'detail/:id'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  senryu:Senryu;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private senryuService: SenryuServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit DetailPage');
    this.loading();
  }

  loading():void {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.senryuService.getSenryu(this.navParams.get('id')).subscribe(
      senryuObj => {
        this.senryu = senryuObj;
      }, 
      err => console.log(err),
      () => {
        loader.dismiss();

        //Tweet Button
        (async () => { 
          await this.delay(1000);
          var senryu_text = `
${this.senryu.user_name}さんの一句
＊ーーーーーーーーーーーーーーーーーー＊
　　${this.senryu.kami_ku}
　　　　　${this.senryu.naka_ku}
　　　　　　　　${this.senryu.simo_ku}
＊ーーーーーーーーーーーーーーーーーー＊
`;
          var element = document.createElement('a');//aタグを作ります
          element.setAttribute('href',"https://twitter.com/share?ref_src=twsrc%5Etfw");
          element.setAttribute('class',"twitter-share-button");
          element.setAttribute('data-size',"large");
          element.setAttribute('data-text',senryu_text);
          element.setAttribute('data-url',AppSettings.HOST + '/app/#/detail/' + this.senryu.id);
          element.setAttribute('data-hashtags',"ニュース川柳");
          element.setAttribute('data-show-count',"false");

          var script = document.createElement('script');//scriptタグを作ります
          script.async = true;
          script.setAttribute('src',"https://platform.twitter.com/widgets.js");
          script.setAttribute('charset','utf-8');

          //aタグ、scriptタグの順で設置します
          var div = document.getElementById("tweet_btn");//ボタンを置きたい場所の手前の要素を取得
          console.log(div);
          div.parentNode.insertBefore(element,div.nextSibling);//ボタンを置きたい場所にaタグを追加
          div.parentNode.insertBefore(script,div.nextSibling);//scriptタグを追加してJSを実行し、aタグをボタンに変身させる
        })();
      }
    );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
