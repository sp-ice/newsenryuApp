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

  getSenryus(): Observable<PagingObject>{
    return this.http.get<PagingObject>(AppSettings.API_ENDPOINT+'senryu');
  }

}
