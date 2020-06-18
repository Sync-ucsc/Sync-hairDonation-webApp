import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorChatComponent } from './donor-chat.component';

describe('DonorChatComponent', () => {
  let component: DonorChatComponent;
  let fixture: ComponentFixture<DonorChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
