import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLayoutComponent } from './driver-layout.component';

describe('DriverLayoutComponent', () => {
  let component: DriverLayoutComponent;
  let fixture: ComponentFixture<DriverLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
