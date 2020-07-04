import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalonRequestComponent } from './manage-salon-request.component';

describe('ManageSalonRequestComponent', () => {
  let component: ManageSalonRequestComponent;
  let fixture: ComponentFixture<ManageSalonRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSalonRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSalonRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
