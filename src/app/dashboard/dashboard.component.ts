import { DateRange } from '../models/dateRange';
import { GetQuickFeedbackService } from '../services/get-quick-feedback.service';
import { Component, OnInit } from '@angular/core';
import { Survey } from '../models/survey';
import {  Message} from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ViewEncapsulation } from '@angular/core';
import { GetDashboardFromDateService } from '../services/get-dashboard-from-date.service';
import {MenuItem} from 'primeng/api';
import { GetCategoriesService } from '../services/get-categories.service';
import { Category } from '../models/category';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  quickSurvey: Survey[] = [];
  msgs: Message[] = [];
  displayError: Boolean = false;
  columns: any[];
  dateRange: DateRange = {};
  fromDate: Date = null;
  toDate: Date;
  displayResults: Boolean = false;
  displaySpinner: Boolean = false;
  items: MenuItem[] = [];
  categoriesList: Category[] = null;


  showExpiredInd: Boolean = false;


  constructor(
    private getQuickFeedbackService: GetQuickFeedbackService,
    private getDashboardFromDateService: GetDashboardFromDateService,
    private messageService: MessageService,
    private getCategoriesService: GetCategoriesService
  ) {}

  ngOnInit() {

    this.getDefaultFromDate();
    this.getCategories();


    console.log('today is' + this.fromDate);




    this.columns = [
      { field: 'surveyId', header: 'surveyId' },
      { field: 'umn', header: 'umn' },
      { field: 'phoneNumber', header: 'phoneNumber' },
      { field: 'firstName', header: 'firstName' },
      { field: 'middleName', header: 'middleName' },
      { field: 'lastName', header: 'lastName' },
      { field: 'shortFeedbackGrade', header: 'shortFeedbackGrade' },
      { field: 'shortFeedbackComment', header: 'shortFeedbackComment' }
    ];
  }

  showExpired() {


    console.log('show exp =' + this.showExpiredInd);
    this.getCategories();

  }

  getQuickSurvey() {
    if (this.fromDate === null)
    {
      this.DateMandatoryMsg();
      console.log('date is null');
      return;
    }

    this.displaySpinner = true;
    this.dateRange.fromDate = this.fromDate;
    console.log('from date=' + this.dateRange.fromDate);
    this.dateRange.toDate = this.toDate;
    this.quickSurvey = [];

    this.getQuickFeedbackService.getquickFeedback(this.dateRange).subscribe(
      data => {
        this.quickSurvey = data;
        console.log('surveys size =' + this.quickSurvey.length);
        this.displayResults = true;
        this.displaySpinner = false;
      },
      error => {
        console.log('error getting surveys' + error);
        this.displayError = true;
        this.displaySpinner = false;
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: ' Error Message',
          detail: 'there was a problem loading the data -please try again later'
        });
      }
    );
  }

  DateMandatoryMsg() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Message',
      detail: 'From date canot be empty'
    });
  }

  getDefaultFromDate() {
    this.getDashboardFromDateService.getDate().subscribe(
      data => {
        console.log('new date  is ' + data);
        this.fromDate = new Date(data);
      },
      error => {
        console.log('error' + error);
        this.msgs = [
          {
            severity: 'info',
            summary: 'Error',
            detail:
              'there was a problem getting default from date , Date was set to today'
          }
        ];
        this.fromDate = new Date();
      }
    );
  }


  getCategories() {
    this.getCategoriesService.getCategories(this.showExpiredInd).subscribe(
      data => {
        this.categoriesList = data;
        console.log('categories size =' + this.categoriesList.length);
        this.populateMenu();
      },
      error => {
        console.log('error' + error);
        this.msgs = [];
          this.msgs.push({severity:'error', summary:' Error Message', detail:'there was a problem loading the page -please try again later'});
      }
    );
  }

  populateMenu()
  {




  this.items[0] = {};
  this.items[1] = {};
  this.items[2] = {};
  this.items[3] = {};
  this.items[0].label = 'Quick feedback';
  this.items[1].label = 'Detailed Feedback grade';
  this.items[2].label = 'Detailed Feedback Q and A';
  this.items[3].label = 'Reports';

  this.items[1].items=[];
  this.items[1].items[0] = {};
  this.items[1].items[0].label = 'Show all';
  this.items[1].items[0].url = 'google.com';


  for(let i =0 ; i<this.categoriesList.length ; i++)
  {
    console.log('category is ' + this.categoriesList[i].categoryName, i );
    this.items[1].items[i+1] = {};
    this.items[1].items[i+1].label = this.categoriesList[i].categoryName;
    this.items[1].items[i+1].queryParams ={'ID' : this.categoriesList[i].categoryId };

  }
  this.items[2].items=[];
  this.items[2].items[0] = {};
  this.items[2].items[0].label = 'Show all';

  for(let i =0 ; i<this.categoriesList.length ; i++)
  {
    console.log('category is ' + this.categoriesList[i].categoryName, i );
    this.items[2].items[i+1] = {};
    this.items[2].items[i+1].label = this.categoriesList[i].categoryName;
    this.items[2].items[i+1].queryParams ={'ID' : this.categoriesList[i].categoryId };

  }




  }


}
