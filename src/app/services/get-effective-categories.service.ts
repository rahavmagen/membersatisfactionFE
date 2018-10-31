import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';
// import { Observable } from 'rxjs/Observable';

declare const rootWebApiUrl: any;

@Injectable()
export class GetEffectiveCategoriesService {

  private baseUrl: string = rootWebApiUrl;



  constructor(private http: HttpClient) { }

  getCategories()  {
     console.log('url is ' + this.baseUrl + '/getCategoriesQandA' );
     return this.http.get<Category[]>(`${this.baseUrl}` + '/getCategoriesQandA');
  }

}
