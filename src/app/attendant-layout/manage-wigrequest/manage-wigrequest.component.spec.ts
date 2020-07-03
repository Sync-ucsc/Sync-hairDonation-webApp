import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWigrequestComponent } from './manage-wigrequest.component';

describe('ManageWigrequestComponent', () => {
  let component: ManageWigrequestComponent;
  let fixture: ComponentFixture<ManageWigrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWigrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWigrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
