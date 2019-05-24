import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../app/app.settings';
import { Word } from '../../models/word';
import { PagingObject } from '../../models/paging.object';

/*
  Generated class for the WordServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WordServiceProvider Provider');
  }

  getWords(_len:string): Observable<PagingObject>{
  	let senddata = {len:_len};
    return this.http.get<PagingObject>(AppSettings.getApiEndPoint()+'word', {params:senddata});
  }

}
