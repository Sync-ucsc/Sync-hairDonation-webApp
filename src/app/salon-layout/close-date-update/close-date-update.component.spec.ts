import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseDateUpdateComponent } from './close-date-update.component';

describe('CloseDateUpdateComponent', () => {
  let component: CloseDateUpdateComponent;
  let fixture: ComponentFixture<CloseDateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseDateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseDateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
