import { TestBed, inject } from '@angular/core/testing';

import { SavePossibleAnswerService } from './save-possible-answer.service';

describe('SavePossibleAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavePossibleAnswerService]
    });
  });

  it('should be created', inject([SavePossibleAnswerService], (service: SavePossibleAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
