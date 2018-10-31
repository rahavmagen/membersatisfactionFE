import { TestBed, inject } from '@angular/core/testing';

import { GetQuickFeedbackService } from './get-quick-feedback.service';

describe('GetQuickFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetQuickFeedbackService]
    });
  });

  it('should be created', inject([GetQuickFeedbackService], (service: GetQuickFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
