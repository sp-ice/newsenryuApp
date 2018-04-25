import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SenryuServiceProvider } from '../../providers/senryu-service/senryu-service';
import { Senryu } from '../../models/senryu';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  senryus: Array<Senryu>;
  next_page_url: string;
  since_id: number;
  hasNextData: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private senryuService: SenryuServiceProvider) {
    
    senryuService.getSenryus().subscribe(
      pagingObj => {
        this.senryus = pagingObj.data;
        this.since_id = this.senryus[0].id;
        this.next_page_url = pagingObj.next_page_url;
        this.hasNextData=(this.next_page_url!=null);
        console.log(pagingObj);
      }, 
      err => console.log(err),
      () => {}
    );
  }

  loadingNext(): Promise<any> {
    return new Promise((resolve) => {
      let url_next = this.next_page_url;
      url_next = url_next.replace('http://133.130.91.251','http://localhost:8100');//test
      this.senryuService.getSenryus(url_next, this.since_id).subscribe(
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

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
