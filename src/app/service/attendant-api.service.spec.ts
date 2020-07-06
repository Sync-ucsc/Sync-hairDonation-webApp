import { TestBed } from '@angular/core/testing';

import { AttendantApiService } from './attendant-api.service';

describe('AttendantApiService', () => {
  let service: AttendantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
