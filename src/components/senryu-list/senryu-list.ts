import { Component, Input} from '@angular/core';

import { SenryuServiceProvider } from '../../providers/senryu-service/senryu-service';
import { Senryu } from '../../models/senryu';
import { AppSettings } from '../../app/app.settings';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the SenryuListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'senryu-list',
  templateUrl: 'senryu-list.html'
})
export class SenryuListComponent {
  senryus: Array<Senryu>;
  next_page_url: string;
  since_id: number;
  hasNextData: boolean;
  @Input() mode: number = AppSettings.MODE_GET_SENRYU_NORMAL;

  constructor(private senryuService: SenryuServiceProvider, public loadingCtrl: LoadingController) {
    
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit SenryuList');
    console.log(this.mode);
    this.loadingFirst();
  }

  loadingFirst():void {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.senryuService.getSenryus(this.mode).subscribe(
      pagingObj => {
        this.senryus = pagingObj.data;
        this.since_id = this.senryus[0].id;
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
      url_next = url_next.replace('http://133.130.91.251','http://localhost:8100');//todo 環境変数で切り分け
      this.senryuService.getSenryus(this.mode, url_next, this.since_id).subscribe(
        pagingObj => {
          this.senryus = this.senryus.concat(pagingObj.data);
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

  likeTapped(event, senryu:Senryu) {
    this.senryuService.likeSenryu(senryu).subscribe(
      like => {
        console.log(like);
        senryu.like_count++;
        senryu.is_liked=1;
      }, 
      err => console.log(err),
      () => {}
    );
  }

  unLikeTapped(event, senryu:Senryu) {
    this.senryuService.likeSenryu(senryu, true).subscribe(
      like => {
        console.log(like);
        senryu.like_count--;
        senryu.is_liked=0;
      }, 
      err => console.log(err),
      () => {}
    );
  }
}
