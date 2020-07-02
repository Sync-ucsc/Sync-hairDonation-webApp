import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonLocationComponent } from './salon-location.component';

describe('SalonLocationComponent', () => {
  let component: SalonLocationComponent;
  let fixture: ComponentFixture<SalonLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
