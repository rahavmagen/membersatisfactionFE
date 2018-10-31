import { TestBed, inject } from '@angular/core/testing';

import { QuickfeedbackService } from './quickfeedback.service';

describe('QuickfeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickfeedbackService]
    });
  });

  it('should be created', inject([QuickfeedbackService], (service: QuickfeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
