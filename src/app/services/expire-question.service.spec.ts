import { TestBed, inject } from '@angular/core/testing';

import { ExpireQuestionService } from './expire-question.service';

describe('ExpireQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpireQuestionService]
    });
  });

  it('should be created', inject([ExpireQuestionService], (service: ExpireQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
