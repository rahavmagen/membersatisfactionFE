import { TestBed, inject } from '@angular/core/testing';

import { GetDashboardFromDateService } from './get-dashboard-from-date.service';

describe('GetDashboardFromDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDashboardFromDateService]
    });
  });

  it('should be created', inject([GetDashboardFromDateService], (service: GetDashboardFromDateService) => {
    expect(service).toBeTruthy();
  }));
});
