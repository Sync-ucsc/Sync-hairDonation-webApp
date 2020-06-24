import { TestBed } from '@angular/core/testing';

import { BeforLoginService } from './befor-login.service';

describe('BeforLoginService', () => {
  let service: BeforLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeforLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
