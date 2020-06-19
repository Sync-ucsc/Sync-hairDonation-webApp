import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedChatComponent } from './shared-chat.component';

describe('SharedChatComponent', () => {
  let component: SharedChatComponent;
  let fixture: ComponentFixture<SharedChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
