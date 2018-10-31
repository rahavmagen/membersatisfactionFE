import { TestBed, inject } from '@angular/core/testing';

import { ExpireAnswerService } from './expire-answer.service';

describe('ExpireAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpireAnswerService]
    });
  });

  it('should be created', inject([ExpireAnswerService], (service: ExpireAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
