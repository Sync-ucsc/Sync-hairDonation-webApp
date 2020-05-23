import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBanComponent } from './user-ban.component';

describe('UserBanComponent', () => {
  let component: UserBanComponent;
  let fixture: ComponentFixture<UserBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
