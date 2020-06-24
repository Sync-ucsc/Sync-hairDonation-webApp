import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendantsComponent } from './manage-attendants.component';

describe('ManageAttendantsComponent', () => {
  let component: ManageAttendantsComponent;
  let fixture: ComponentFixture<ManageAttendantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAttendantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAttendantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
