import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionBanComponent } from './user-action-ban.component';

describe('UserActionBanComponent', () => {
  let component: UserActionBanComponent;
  let fixture: ComponentFixture<UserActionBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionBanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
