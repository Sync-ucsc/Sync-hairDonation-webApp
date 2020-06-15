import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WigRequestComponent } from './wig-request.component';

describe('WigRequestComponent', () => {
  let component: WigRequestComponent;
  let fixture: ComponentFixture<WigRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WigRequestComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WigRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
