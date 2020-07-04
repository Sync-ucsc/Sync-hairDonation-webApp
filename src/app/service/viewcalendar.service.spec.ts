import { TestBed } from '@angular/core/testing';

import { ViewCalendarService } from './viewcalendar.service';

describe('ViewCalendarService', () => {
  let service: ViewCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
