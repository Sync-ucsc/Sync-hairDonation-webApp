import { TestBed } from '@angular/core/testing';

import { DonorLoginService } from './donor-login.service';

describe('DonorLoginService', () => {
  let service: DonorLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
