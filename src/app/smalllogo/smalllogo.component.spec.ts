import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmalllogoComponent } from './smalllogo.component';

describe('SmalllogoComponent', () => {
  let component: SmalllogoComponent;
  let fixture: ComponentFixture<SmalllogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmalllogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmalllogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
