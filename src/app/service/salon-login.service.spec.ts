import { TestBed } from '@angular/core/testing';

import { SalonLoginService } from './salon-login.service';

describe('SalonLoginService', () => {
  let service: SalonLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalonLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
