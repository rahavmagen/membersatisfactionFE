 import { Question } from '../models/question';
 import { Injectable } from '@angular/core';
 import {HttpClient} from '@angular/common/http';
 import { Category } from '../models/category';
//  import { Observable } from 'rxjs/Observable';



  declare const rootWebApiUrl: any;

  @Injectable()
  export class ExpireQuestionService {

    private baseUrl: string = rootWebApiUrl;
    constructor(private http: HttpClient) {
    }

    expire(question: Question) {
      console.log('url is ' + this.baseUrl + '/expireQuestion' + ' , data : ' + question);
      return this.http.post(this.baseUrl + '/expireQuestion', question);

    }


}
