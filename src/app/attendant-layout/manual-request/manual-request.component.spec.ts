import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualRequestComponent } from './manual-request.component';

describe('ManualRequestComponent', () => {
  let component: ManualRequestComponent;
  let fixture: ComponentFixture<ManualRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualRequestComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
