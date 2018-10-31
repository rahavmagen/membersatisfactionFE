import { MemberAnswer } from '../models/memberAnswer';
import { Category } from '../models/category';
import { CategoryAnswer } from '../models/categoryAnswer';
import { Survey } from '../models/survey';
import { Component, OnInit, Input } from '@angular/core';
import { QuickfeedbackService } from '../services/quickfeedback.service';
import { Feedback } from '../models/feedback';
import { TabData } from '../models/tabData';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { GetEffectiveCategoriesService } from '../services/get-effective-categories.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-detailed-feedback',
  templateUrl: './detailed-feedback.component.html',
  styleUrls: ['./detailed-feedback.component.css'] ,
  providers: [MessageService]
})
export class DetailedFeedbackComponent implements OnInit {

   categoriesList: Category[];
   survey: Survey = {};
   categoryIdExist: Boolean = false;
   possibleAnswerIdExist: Boolean = false;
   categoryAnswer: CategoryAnswer = {};
   memberAnswer: MemberAnswer = {};
   categoryComment: string;
   categoryGrade ;
   feedbacks: Feedback[] = new Array;
   currentTabIndex = 0 ;
   tabsData: TabData[] = new Array;
   msgs: Message[] = [];
   displayError: Boolean = false;
   displayAnswersP: Boolean = false;
  gradeMap = new Map<string, string>();

   @Input()  datailedFeedbackDisplay: Boolean;
   @Input()  surveyAnswer: Survey;

  constructor(private getEffectiveCategoriesService: GetEffectiveCategoriesService , private quickfeedbackService: QuickfeedbackService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.getCategories();
    this.buildGradeHashMap();
    this.survey.memberAnswers = [];
    this.survey.categoriesAnswers = [];
    // this.datailedFeedbackDisplay  = true;

  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    console.log('on change');
    if ( this.displayError)
    {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:' Error Message', detail:'there was a problem loading the page -please try again later'});
    }
  }

  displayDetailedAgain()
  {
    this.datailedFeedbackDisplay = true;
    this.displayAnswersP = false;
  }

  getCategories() {
    this.spinner.show();
    this.getEffectiveCategoriesService.getCategories().subscribe(
      data => {
        this.categoriesList = data;
          for (const i in this.categoriesList)
          {
           console.log(this.categoriesList[i].categoryName);
           this.tabsData[i] = {};
           this.tabsData[i].categoryName = this.categoriesList[i].categoryName;

           this.tabsData[i].memberAnswers = [];
           for (let x = 0 ; x < this.categoriesList[i].questions.length ; x++)
           {
               this.tabsData[i].memberAnswers[x] = {};
               this.tabsData[i].memberAnswers[x].possibleAnswer = {};
               this.tabsData[i].memberAnswers[x].possibleAnswer.question = {};
               this.tabsData[i].memberAnswers[x].id = {};
           }
         }
         console.log('categories size =' + this.categoriesList.length);
         this.spinner.hide();

      },
      error => {
        this.spinner.hide();
        console.log('error getting categories' + error);
        this.displayError = true;
      }
    );
  }

  buildGradeHashMap() {
    this.gradeMap.set('0', 'N/A');
    this.gradeMap.set('1', 'Very Poor');
    this.gradeMap.set('2', 'Poor');
    this.gradeMap.set('3', 'Good');
    this.gradeMap.set('4', 'Very good');
    this.gradeMap.set('5', 'Excellent');



  }

   buildTabsData(categoryIndex, answerValue ,  qIndex   )
   {
    console.log('select category is ' + this.categoriesList[this.currentTabIndex].categoryId);
    console.log('select question is ' +  this.categoriesList[this.currentTabIndex].questions[qIndex].questionText);
    console.log('select answer is ' + answerValue);


    this.tabsData[categoryIndex].memberAnswers[qIndex].id.surveyId = this.surveyAnswer.surveyId;
    this.tabsData[categoryIndex].memberAnswers[qIndex].id.questionId =
    this.categoriesList[this.currentTabIndex].questions[qIndex].questionId;
    this.tabsData[categoryIndex].memberAnswers[qIndex].possibleAnswer.question = {};
    this.tabsData[categoryIndex].memberAnswers[qIndex].possibleAnswer.question.questionId  =
    this.categoriesList[this.currentTabIndex].questions[qIndex].questionId;
    this.tabsData[categoryIndex].memberAnswers[qIndex].possibleAnswer.question.questionText  =
    this.categoriesList[this.currentTabIndex].questions[qIndex].questionText;
    this.tabsData[categoryIndex].memberAnswers[qIndex].category ={};
    this.tabsData[categoryIndex].memberAnswers[qIndex].category.categoryId=
    this.categoriesList[this.currentTabIndex].categoryId;
   }


// since the save survey is also updating the exisiting survey id - need to fill the current value
// so actually update will be done  with the existing values

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



  setTabTouched()
  {
    this.tabsData[this.currentTabIndex].tabTouched = true;
    this.tabsData[this.currentTabIndex].categoryId = this.categoriesList[this.currentTabIndex].categoryId;
    this.tabsData[this.currentTabIndex].gradeText  = this.gradeMap.get(this.tabsData[this.currentTabIndex].grade);
    const tmp =  this.gradeMap.get(this.tabsData[this.currentTabIndex].grade);
    console .log ('tmp = ' + tmp);
    console .log ('grade value is' + this.tabsData[this.currentTabIndex].grade  );
    console.log('grade text is'+ this.tabsData[this.currentTabIndex].gradeText );
  }

  getTabNumber(event)
  {
    this.currentTabIndex = event.index;
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

  continueToSummery() {
      this.updateUserInfo();
      this.displayAnswersP = true;
      this.datailedFeedbackDisplay = false;
      this.copyTabsToSurvey();

  }

}
