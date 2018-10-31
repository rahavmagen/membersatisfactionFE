import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PossibleAnswer } from '../models/possibleAnswer';
// import { Observable } from 'rxjs/Observable';


declare const rootWebApiUrl: any;

@Injectable()
export class ExpireAnswerService {

  private baseUrl: string = rootWebApiUrl;
  constructor(private http: HttpClient) {
  }

  expire(possibleAnswer: PossibleAnswer) {
    console.log('url is ' + this.baseUrl + '/expireAnswer' + ' , data : ' + possibleAnswer);
    return this.http.post(this.baseUrl + '/expireAnswer', possibleAnswer);

  }

}
