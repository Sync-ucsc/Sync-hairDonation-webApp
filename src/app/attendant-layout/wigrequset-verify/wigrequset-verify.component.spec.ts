import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WigrequsetVerifyComponent } from './wigrequset-verify.component';

describe('WigrequsetVerifyComponent', () => {
  let component: WigrequsetVerifyComponent;
  let fixture: ComponentFixture<WigrequsetVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WigrequsetVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WigrequsetVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
