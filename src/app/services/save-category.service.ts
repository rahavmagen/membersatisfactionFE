import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';
// import { Observable } from 'rxjs/Observable';


declare const rootWebApiUrl: any;

@Injectable()
export class SaveCategoryService {

  private baseUrl: string = rootWebApiUrl;
  constructor(private http: HttpClient) {
  }

  save(category: Category) {
    console.log('url is ' + this.baseUrl + '/saveCategory' + ' , data : ' + category);
    return this.http.post<Category>(this.baseUrl + '/saveCategory', category);

  }


}
