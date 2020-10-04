import { TestBed } from '@angular/core/testing';

import { AttendantLoginService } from './attendant-login.service';

describe('AttendantLoginService', () => {
  let service: AttendantLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendantLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
