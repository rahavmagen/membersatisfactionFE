import { Component, OnInit } from '@angular/core';
import { CategoryList } from './categoryList';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  //  categoriesList: CategoryList = [{
  //   tabs: 'tab1',
  //   questions: {
  //     questionText: 'q1',
  //     possibleAnswers: [{
  //         answerValue: 'Yes'
  //       },
  //       {
  //         answerValue: 'No'
  //       }
  //     ]
  //   }
  // } ];
  // categoriesList = {tab  : question  } ;

  categoryGrade = [] ;
  // grades: any[] = new Array;
  currentTabIndex = 0 ;
  str: string[][] = new Array;
  constructor() { }

  ngOnInit() {
    this.str[0] = [];
      this.str[0][0] = 'aaa';
    console.log ( this.str[0][0]  ) ;

  }

  displayFeedback(e)
  {
    console.log('index ='  +  e.index );

    // this.categoryGrade = this.grades [e.index];
    // console.log('is display feedback grade is ' + this.grades[ e.index] );
    console.log('category code is ' +  this.categoryGrade[e.index] );
    this.currentTabIndex = e.index;
  }


  pushOrUpdateFeedback()
  {

    // this.grades[this.currentTabIndex] = this.categoryGrade[this.currentTabIndex];
    console.log('grade in 1 is  ' + this.categoryGrade[1] );
  }

}
