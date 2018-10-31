import { TestBed, inject } from '@angular/core/testing';

import { SaveQuestionService } from './save-question.service';

describe('SaveQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveQuestionService]
    });
  });

  it('should be created', inject([SaveQuestionService], (service: SaveQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
