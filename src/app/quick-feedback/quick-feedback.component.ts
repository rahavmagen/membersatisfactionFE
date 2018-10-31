import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Survey} from '../models/survey';
import {QuickfeedbackService} from '../services/quickfeedback.service';
import {Message} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-quick-feedback',
  templateUrl: './quick-feedback.component.html',
  styleUrls: ['./quick-feedback.component.css']
})
export class QuickFeedbackComponent implements OnInit {

  constructor(private quickfeedbackService: QuickfeedbackService, private confirmationService: ConfirmationService ,
    private spinner: NgxSpinnerService ) {}

  msgs: Message[] = [];
  form;
  survey: Survey;
  displayConfirmationWindow = false;
  displayQuickFeedback = true;
  displayDetailedFeedbackInd = null;
  phonePattern = '^[0]{1}[0-9]{9}$';
  umnPattern = '^[0-9]*$';



  showDialog() {
    this.displayConfirmationWindow = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)] ),
      phoneNumber: new FormControl('', [Validators.required , Validators.pattern(this.phonePattern)]),
      grade: new FormControl('', [Validators.required]),
      umn: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(this.umnPattern)]),
      comments: new FormControl('')
    });



  }

  getUrl()
  {
    return 'url("../assets/handPic.png")';
  }

  saveSurvey(form) {
    console.log('the umn is ' + form.umn);
    this.survey = {};
    this.survey.umn = form.umn;
    this.survey.firstName = form.firstName;
    this.survey.middleName = form.middleName;
    this.survey.lastName = form.lastName;
    this.survey.phoneNumber = form.phoneNumber;
    this.survey.shortFeedbackGrade = form.grade;
    this.survey.shortFeedbackComment = form.comments;

    console.log(this.survey + 'data');

    this.confirmationService.confirm(
      {
        message: 'Your feedback will be saved',
        header: 'Confirmation',
        // icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ok',
        rejectLabel: 'Cancel',
        accept: () => {
          this.saveShortFeedback();
        },
        reject: () => {
          console.log('feedback was not saved');
        }
      });

  }

  saveShortFeedback() {
    this.spinner.show();
    this.quickfeedbackService.save(this.survey).subscribe
      (
      data => {
        console.log('new survey id is ' + data.surveyId);
        this.survey.surveyId = data.surveyId;
        this.checkIfOpenDetailedFeedback();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log('error' + error);
        this.msgs = [{severity: 'info', summary: 'Error', detail: 'there was a problem saving your feedback , please try again later'}];
      }
      );
  }


 checkIfOpenDetailedFeedback()
 {
  this.confirmationService.confirm(
    {
      message: 'Thank you for your feedback - do you want to continue and give a detailed feedback?',
      header: 'Confirmation',
      //            icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.displayDetailedFeedbackInd = true;
        this.displayQuickFeedback = null;
      },
      reject: () => {
        console.log('no detailed feedback');
        this.form.reset();
      }
    });



 }


}
