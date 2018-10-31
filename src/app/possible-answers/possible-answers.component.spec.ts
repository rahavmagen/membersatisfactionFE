import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleAnswersComponent } from './possible-answers.component';

describe('PossibleAnswersComponent', () => {
  let component: PossibleAnswersComponent;
  let fixture: ComponentFixture<PossibleAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossibleAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
