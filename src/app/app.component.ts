import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string;

  form;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      umn: new FormControl(),
      quickFeedBackGrade: new FormControl()

    }
    );


  }







}

