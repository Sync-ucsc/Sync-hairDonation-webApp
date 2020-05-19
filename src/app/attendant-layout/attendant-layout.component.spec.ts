import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantLayoutComponent } from './attendant-layout.component';

describe('AttendantLayoutComponent', () => {
  let component: AttendantLayoutComponent;
  let fixture: ComponentFixture<AttendantLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendantLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
