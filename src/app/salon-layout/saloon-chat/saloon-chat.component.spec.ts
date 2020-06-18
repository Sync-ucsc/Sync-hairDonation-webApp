import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonChatComponent } from './saloon-chat.component';

describe('SaloonChatComponent', () => {
  let component: SaloonChatComponent;
  let fixture: ComponentFixture<SaloonChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaloonChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaloonChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
