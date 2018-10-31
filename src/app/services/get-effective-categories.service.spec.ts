import { TestBed, inject } from '@angular/core/testing';

import { GetEffectiveCategoriesService } from './get-effective-categories.service';

describe('GetEffectiveCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetEffectiveCategoriesService]
    });
  });

  it('should be created', inject([GetEffectiveCategoriesService], (service: GetEffectiveCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
