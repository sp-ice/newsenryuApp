import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app.settings';
import { Senryu } from '../../models/senryu';
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

  getSenryus(_url: string=AppSettings.API_ENDPOINT+'senryu', _since_id:number=null): Observable<PagingObject>{
  	let senddata={};
  	if(_since_id != null){
  		senddata["since_id"] = String(_since_id);
  	}
    return this.http.get<PagingObject>(_url, {params:senddata});
  }

}
