import { TestBed } from '@angular/core/testing';

import { DonorApiService } from './donor-api.service';

describe('DonorApiService', () => {
  let service: DonorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
