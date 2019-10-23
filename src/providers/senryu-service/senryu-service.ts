import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app.settings';
import { Senryu } from '../../models/senryu';
import { Like } from '../../models/like';
import { PagingObject } from '../../models/paging.object';
/*
  Generated class for the SenryuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SenryuServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SenryuServiceProvider Provider');
  }

  getSenryus(_mode:number=AppSettings.MODE_GET_SENRYU_NORMAL, _url: string=AppSettings.getApiEndPoint()+'senryu', _since_id:number=null): Observable<PagingObject>{
    switch (_mode) {
      case AppSettings.MODE_GET_SENRYU_MINE:  
        _url = this.addParam2URL(_url, 'mode', 'mine');
        break;
      case AppSettings.MODE_GET_SENRYU_LIKED:
        _url = this.addParam2URL(_url, 'mode', 'liked');
        break;
      case AppSettings.MODE_GET_SENRYU_NORMAL:  
        break;
      default:
        break;
    }
    if(_since_id != null){
  		_url = this.addParam2URL(_url, 'since_id', _since_id);
    }
    console.log("getSenryu:"+_url);
    return this.http.get<PagingObject>(_url);
  }

  getSenryu(_id:number): Observable<Senryu>{
    let url = AppSettings.getApiEndPoint()+'senryu/'+_id;
    return this.http.get<Senryu>(url);
  }

  postSenryu(_senryu:Senryu): Observable<Senryu>{
  	let url = AppSettings.getApiEndPoint()+'senryu';
  	let senddata={
  		word_kami_id: _senryu.kami_id,
  		word_naka_id: _senryu.naka_id,
  		word_simo_id: _senryu.simo_id,
  	};
    return this.http.post<Senryu>(url, senddata);
  }

  likeSenryu(_senryu:Senryu, _flg_delete:Boolean=false): Observable<Like>{
    let url = AppSettings.getApiEndPoint()+'like';
    let senddata={
      senryu_id: _senryu.id,
      flg_delete: _flg_delete
    };
    return this.http.post<Like>(url, senddata);
  }

  private addParam2URL(_url: string, _key:string, _value:any):string{
    var resurl = _url;
    resurl += (resurl.indexOf('?') == -1) ? '?':'&';
    resurl += _key + '=' + String(_value);
    return resurl;
  }

}
