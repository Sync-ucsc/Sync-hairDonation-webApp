import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonorRequestComponent } from './manage-donor-request.component';

describe('ManageDonorRequestComponent', () => {
  let component: ManageDonorRequestComponent;
  let fixture: ComponentFixture<ManageDonorRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDonorRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDonorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
