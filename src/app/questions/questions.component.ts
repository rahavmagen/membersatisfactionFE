import { SaveQuestionService } from '../services/save-question.service';
import { ExpireQuestionService } from '../services/expire-question.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';




import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Category } from '../models/category';
import { Question } from '../models/question';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnChanges {
  selectedQuestion: Question;
  displayDialog: boolean;
  isNewQuestionAdded: boolean;
  newQuestion: Question;
  currentDate: Date;
  displayNoQuestionMsg = false;

  @Input()
  category: Category;

  constructor(private saveQuestionService: SaveQuestionService,
              private confirmationService: ConfirmationService,
              private expireQuestionService: ExpireQuestionService) {}

  ngOnInit() {
    this.currentDate = new Date();
  }

  ngOnChanges() {
    this.selectedQuestion = null;
  }

  addNewQuestionPopUp() {
    this.newQuestion = {};
    this.isNewQuestionAdded = true;
    this.displayDialog = true;
  }

  saveNewQuestion() {
    const questionList = [...this.category.questions];


    if (this.isNewQuestionAdded) {
      this.newQuestion.effectiveDate = this.currentDate;
      this.newQuestion.possibleAnswers = [];
      this.newQuestion.category = this.category;

      this.saveQuestionService.save(this.newQuestion).subscribe(
        data => {
          console.log(data + 'data');
          questionList.push(data);
          this.category.questions = questionList;
          this.newQuestion = null;
          this.displayDialog = false;
        },
        error => {
          console.log('error' + error);
        }
      );
    } else {
      console.log('else');
      questionList[
        this.category.questions.indexOf(this.selectedQuestion)
      ] = this.newQuestion;
    }
    this.category.questions = questionList;
  }

  cancelQuestionPopUp() {
    console.log(' cancel - do nothing ');
    this.newQuestion = null;
    this.displayDialog = false;
  }

  confirmDeleteQuestion() {
    if ( this.selectedQuestion != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to remove ' + this.selectedQuestion.questionText + ' question?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('you accepted');
            this.expireQuestionService.expire(this.selectedQuestion).subscribe(
              data => {
                console.log('question expired');
                const index: number = this.category.questions.indexOf(this.selectedQuestion);
                if ( index !== -1 ) {
                 this.category.questions.splice(index , 1);
                }
              },
              error => {
                console.log('error' + error);
              }
            );
        },
        reject: () => {
          console.log('you rejected');
        }
      });
    } else {
      console.log('question not selected');
      this.displayNoQuestionMsg = true;
    }

}


}
