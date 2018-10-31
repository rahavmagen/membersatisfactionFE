import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';

declare const rootWebApiUrl: any;

@Injectable()
export class GetCategoriesService {

  private baseUrl: string = rootWebApiUrl;



  constructor(private http: HttpClient) { }

  getCategories(getExpired: Boolean)  {
     console.log('url is ' + this.baseUrl + '/getCategories' );
     return this.http.post<Category[]>(`${this.baseUrl}` + '/getCategories' , getExpired);
  }

}
