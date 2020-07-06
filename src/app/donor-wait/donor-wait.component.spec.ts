import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorWaitComponent } from './donor-wait.component';

describe('DonorWaitComponent', () => {
  let component: DonorWaitComponent;
  let fixture: ComponentFixture<DonorWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
