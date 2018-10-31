import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Question } from '../models/question';
// import { Observable } from 'rxjs/Observable';


declare const rootWebApiUrl: any;

@Injectable()
export class SaveQuestionService {

  private baseUrl: string = rootWebApiUrl;
  constructor(private http: HttpClient) {
  }

  save(question: Question) {
    console.log('url is ' + this.baseUrl + '/saveQuestion' + ' , data : ' + question);
    return this.http.post<Question>(this.baseUrl + '/saveQuestion', question);

  }


}
