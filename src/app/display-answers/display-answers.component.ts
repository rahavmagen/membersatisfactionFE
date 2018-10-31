import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Survey } from '../models/survey';
import { TabData } from '../models/tabData';
import { QuickfeedbackService } from '../services/quickfeedback.service';
import { Message } from 'primeng/api';
import { MemberAnswer } from '../models/memberAnswer';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-display-answers',
  templateUrl: './display-answers.component.html',
  styleUrls: ['./display-answers.component.css']
})
export class DisplayAnswersComponent implements OnInit {

  @Input()  surveyAnswer: Survey;
  @Input()  displayAnswers: Boolean;
  @Input()  tabsData: TabData[];
  @Output() detailedDisplayAgain = new EventEmitter<boolean>();


  survey: Survey = {};
  msgs: Message[] = [];
  memberAnswer: MemberAnswer = {};
  displayThankYou: Boolean = false;



  constructor( private quickfeedbackService: QuickfeedbackService , private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.survey.memberAnswers = [];
    this.survey.categoriesAnswers = [];
  }


  openDetailedAgain()
  {
    this.displayAnswers = false;
    this.detailedDisplayAgain.emit (true);
  }


  private copyTabsToSurvey()
  {
    this.updateUserInfo();

    for (let i = 0 ; i < this.tabsData.length  ;  i++)
    { // loop over the tabs data and build the survey the same way
      if (this.tabsData[i].tabTouched)
      {
        this.survey.categoriesAnswers[i] = {};
        this.survey.categoriesAnswers[i].id = {};
        this.survey.categoriesAnswers[i].id.surveyId = this.surveyAnswer.surveyId;
        this.survey.categoriesAnswers[i].id.categoryId = this.tabsData[i].categoryId;
        this.survey.categoriesAnswers[i].comment = this.tabsData[i].comment;
         // tslint:disable-next-line:radix
         this.survey.categoriesAnswers[i].grade = parseInt ( this.tabsData[i].grade);
      }




      for (let x = 0 ; x <  this.tabsData[i].memberAnswers.length  ; x++)
      {
        if (this.tabsData[i].memberAnswers[x].possibleAnswer.answerValue != null)
        {
          console.log('answer value = ' +  this.tabsData[i].memberAnswers[x].possibleAnswer.answerValue );
          this.memberAnswer = this.tabsData[i].memberAnswers[x];
          this.survey.memberAnswers.push(this.memberAnswer);
          this.memberAnswer = {};
        }
      }
    }

  }

  private updateUserInfo()
  {
    this.survey.umn = this.surveyAnswer.umn;
    this.survey.firstName = this.surveyAnswer.firstName;
    this.survey.middleName = this.surveyAnswer.middleName;
    this.survey.lastName = this.surveyAnswer.lastName;
    this.survey.phoneNumber = this.surveyAnswer.phoneNumber;
    this.survey.shortFeedbackGrade = this.surveyAnswer.shortFeedbackGrade;
    this.survey.shortFeedbackComment = this.surveyAnswer.shortFeedbackComment;
    this.survey.surveyId = this.surveyAnswer.surveyId;
  }

  saveFeedback() {
    this.spinner.show();
    console.log('call save');
    this.copyTabsToSurvey();
    this.quickfeedbackService.save(this.survey).subscribe
      (
      data => {
        console.log(data + 'data');
        this.msgs = [];
        // this.msgs.push({severity: 'success', summary: 'Thank You - your feedback has been saved ', detail: ''});
        this.displayThankYou = true;
        this.displayAnswers = false;
        this.spinner.hide();

      },
      error => {
        console.log('error saving feedback');
        this.msgs.push({severity:'error', summary:'Error Message', detail:'There was en error while trying to save your feedback - please try again later'});
        this.spinner.hide();
        this.displayAnswers = false;
      }
      );
  }

}
