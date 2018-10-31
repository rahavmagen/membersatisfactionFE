import { Question } from '../models/question';
import { SavePossibleAnswerService } from '../services/save-possible-answer.service';
import { ExpireAnswerService } from '../services/expire-answer.service';
import { Component, OnInit, Input } from '@angular/core';
import { PossibleAnswer } from '../models/possibleAnswer';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-possible-answers',
  templateUrl: './possible-answers.component.html',
  styleUrls: ['./possible-answers.component.css']
})
export class PossibleAnswersComponent implements OnInit {
  selectedAnswer: PossibleAnswer;
  displayDialog: boolean;
  isNewAnswerAdded: boolean;
  newAnswer: PossibleAnswer;
  currentDate: Date;
  displayNoAnswerMsg = false;

  @Input() question: Question;

  constructor(private savePossibleAnswerService: SavePossibleAnswerService ,
               private expireAnswerService: ExpireAnswerService,
               private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.currentDate = new Date();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.selectedAnswer = null;
  }

  addNewAnswerPopUp() {
    this.newAnswer = {};
    this.isNewAnswerAdded = true;
    this.displayDialog = true;
  }

  savePossibleAnswer() {
    const answerList = [...this.question.possibleAnswers];
    this.newAnswer.effectiveDate = this.currentDate;
    this.newAnswer.question = this.question;

    if (this.isNewAnswerAdded) {
      this.savePossibleAnswerService.save(this.newAnswer).subscribe(
        data => {
          console.log(data + 'data');

          answerList.push(data);
          this.newAnswer = null;
          this.displayDialog = false;
        },
        error => {
          console.log('error' + error);
        }
      );
    } else {
      answerList[
        this.question.possibleAnswers.indexOf(this.selectedAnswer)
      ] = this.newAnswer;
    }
    this.question.possibleAnswers = answerList;
  }

  cancelAnswerPopUp() {
    console.log(' cancel - do nothing ');
    this.newAnswer = null;
    this.displayDialog = false;
  }


  confirmDeleteAnswer() {
    if ( this.selectedAnswer != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to remove ' + this.selectedAnswer.answerValue + ' answer?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('you accepted');
            this.expireAnswerService.expire(this.selectedAnswer).subscribe(
              data => {
                console.log('question expired');
                const index: number = this.question.possibleAnswers.indexOf(this.selectedAnswer);
                if ( index !== -1 ) {
                 this.question.possibleAnswers.splice(index , 1);
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
      this.displayNoAnswerMsg = true;
    }

}

}
