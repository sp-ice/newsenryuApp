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

  getWords(_len:string, _url: string=AppSettings.getApiEndPoint()+'word', _since_id:number=null): Observable<PagingObject>{
    let senddata = {len:_len};
    if(_since_id != null){
  		_url = this.addParam2URL(_url, 'since_id', _since_id);
    }
    return this.http.get<PagingObject>(_url, {params:senddata});
  }

  private addParam2URL(_url: string, _key:string, _value:any):string{
    var resurl = _url;
    resurl += (resurl.indexOf('?') == -1) ? '?':'&';
    resurl += _key + '=' + String(_value);
    return resurl;
  }

}
