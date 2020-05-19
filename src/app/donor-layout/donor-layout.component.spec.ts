import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorLayoutComponent } from './donor-layout.component';

describe('DonorLayoutComponent', () => {
  let component: DonorLayoutComponent;
  let fixture: ComponentFixture<DonorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
