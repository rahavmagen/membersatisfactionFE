import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';
// import { Observable } from 'rxjs/Observable';


declare const rootWebApiUrl: any;

@Injectable()
export class ExpireCategoryService {

  private baseUrl: string = rootWebApiUrl;
  constructor(private http: HttpClient) {
  }

  expire(category: Category) {
    console.log('url is ' + this.baseUrl + '/expireCategory' + ' , data : ' + category);
    return this.http.post(this.baseUrl + '/expireCategory', category);

  }


}
