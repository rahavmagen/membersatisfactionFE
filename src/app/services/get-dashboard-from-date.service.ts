
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

declare const rootWebApiUrl: any;

@Injectable()
export class GetDashboardFromDateService {

  private baseUrl: string = rootWebApiUrl;

  constructor(private http: HttpClient) { }

  getDate()  {
     console.log('url is ' + this.baseUrl + '/getDefaultDate' );
     return this.http.get<Date>(`${this.baseUrl}` + '/getDefaultDate' );
  }

}
