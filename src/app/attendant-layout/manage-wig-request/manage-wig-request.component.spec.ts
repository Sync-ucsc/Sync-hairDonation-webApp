import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWigRequestComponent } from './manage-wig-request.component';

describe('ManageWigRequestComponent', () => {
  let component: ManageWigRequestComponent;
  let fixture: ComponentFixture<ManageWigRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWigRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWigRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
