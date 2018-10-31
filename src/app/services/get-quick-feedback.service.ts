import { DateRange } from '../models/dateRange';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Survey } from '../models/survey';
// import { Observable } from 'rxjs/Observable';

declare const rootWebApiUrl: any;

@Injectable()
export class GetQuickFeedbackService {

  private baseUrl: string = rootWebApiUrl;

  constructor(private http: HttpClient) { }

  getquickFeedback(dateRange: DateRange)  {
     console.log('url is ' + this.baseUrl + '/getQuickSurvey' );
     return this.http.post<Survey[]>(`${this.baseUrl}` + '/getQuickSurvey' , dateRange);
  }

}
