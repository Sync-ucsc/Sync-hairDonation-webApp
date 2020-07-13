import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FringerprintComponent } from './fringerprint.component';

describe('FringerprintComponent', () => {
  let component: FringerprintComponent;
  let fixture: ComponentFixture<FringerprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FringerprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FringerprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
