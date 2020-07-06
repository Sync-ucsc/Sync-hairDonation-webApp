import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonoractiveComponent } from './donoractive.component';

describe('DonoractiveComponent', () => {
  let component: DonoractiveComponent;
  let fixture: ComponentFixture<DonoractiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonoractiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonoractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
