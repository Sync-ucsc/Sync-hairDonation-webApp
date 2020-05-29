import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalonsComponent } from './manage-salons.component';

describe('ManageSalonsComponent', () => {
  let component: ManageSalonsComponent;
  let fixture: ComponentFixture<ManageSalonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSalonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSalonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
