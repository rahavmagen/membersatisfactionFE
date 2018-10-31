import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

@Input() displayThankYou;

  constructor() { }

  ngOnInit() {
  }

}
