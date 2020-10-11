import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRequestComponent } from './donor-request.component';

describe('DonorRequestComponent', () => {
  let component: DonorRequestComponent;
  let fixture: ComponentFixture<DonorRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
