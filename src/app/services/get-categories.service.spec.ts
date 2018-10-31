import { TestBed, inject } from '@angular/core/testing';

import { GetCategoriesService } from './get-categories.service';

describe('GetCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCategoriesService]
    });
  });

  it('should be created', inject([GetCategoriesService], (service: GetCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
