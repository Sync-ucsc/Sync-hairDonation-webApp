import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonLayoutComponent } from './salon-layout.component';

describe('SalonLayoutComponent', () => {
  let component: SalonLayoutComponent;
  let fixture: ComponentFixture<SalonLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
