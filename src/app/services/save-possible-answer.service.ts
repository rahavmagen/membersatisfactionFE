import { PossibleAnswer } from '../models/possibleAnswer';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';
// import { Observable } from 'rxjs/Observable';


declare const rootWebApiUrl: any;

@Injectable()
export class SavePossibleAnswerService {

  private baseUrl: string = rootWebApiUrl;
  constructor(private http: HttpClient) {
  }

  save(possibleAnswer: PossibleAnswer) {
    console.log('url is ' + this.baseUrl + '/savePossibleAnswer' + ' , data : ' + possibleAnswer);
    return this.http.post<Category>(this.baseUrl + '/savePossibleAnswer', possibleAnswer);

  }


}
