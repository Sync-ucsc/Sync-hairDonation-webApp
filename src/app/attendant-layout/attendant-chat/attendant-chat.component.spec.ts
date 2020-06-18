import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantChatComponent } from './attendant-chat.component';

describe('AttendantChatComponent', () => {
  let component: AttendantChatComponent;
  let fixture: ComponentFixture<AttendantChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendantChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
