import { TestBed, inject } from '@angular/core/testing';

import { SaveCategoryService } from './save-category.service';

describe('SaveCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveCategoryService]
    });
  });

  it('should be created', inject([SaveCategoryService], (service: SaveCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
