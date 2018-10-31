import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Survey } from '../models/survey';
// import { Observable } from 'rxjs/Observable';

declare const rootWebApiUrl: any;

@Injectable()
export class QuickfeedbackService {


  private baseUrl: string = rootWebApiUrl;
  constructor(private http: HttpClient) {
  }

  save(survey: Survey) {
    console.log('url is ' + this.baseUrl + '/saveQuickFeedback' + ' , data : ' + survey);
    return this.http.post<Survey>(this.baseUrl + '/saveQuickFeedback', survey);

  }


}
