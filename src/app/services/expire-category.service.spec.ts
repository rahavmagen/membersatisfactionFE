import { TestBed, inject } from '@angular/core/testing';

import { ExpireCategoryService } from './expire-category.service';

describe('ExpireCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpireCategoryService]
    });
  });

  it('should be created', inject([ExpireCategoryService], (service: ExpireCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
