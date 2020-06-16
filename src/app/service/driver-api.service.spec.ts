import { TestBed } from '@angular/core/testing';

import { DriverApiService } from './Driver-api.service';

describe('DriverApiService', () => {
  let service: SalonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
