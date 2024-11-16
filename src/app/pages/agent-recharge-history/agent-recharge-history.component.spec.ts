import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRechargeHistoryComponent } from './agent-recharge-history.component';

describe('AgentRechargeHistoryComponent', () => {
  let component: AgentRechargeHistoryComponent;
  let fixture: ComponentFixture<AgentRechargeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRechargeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentRechargeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
