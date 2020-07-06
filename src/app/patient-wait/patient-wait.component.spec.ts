import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWaitComponent } from './patient-wait.component';

describe('PatientWaitComponent', () => {
  let component: PatientWaitComponent;
  let fixture: ComponentFixture<PatientWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
