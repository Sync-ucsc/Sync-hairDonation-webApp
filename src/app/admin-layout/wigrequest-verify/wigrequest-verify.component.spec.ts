import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WigrequestVerifyComponent } from './wigrequest-verify.component';

describe('WigrequestVerifyComponent', () => {
  let component: WigrequestVerifyComponent;
  let fixture: ComponentFixture<WigrequestVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WigrequestVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WigrequestVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
