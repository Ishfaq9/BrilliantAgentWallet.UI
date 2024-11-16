import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBalanceComponent } from './agent-balance.component';

describe('AgentBalanceComponent', () => {
  let component: AgentBalanceComponent;
  let fixture: ComponentFixture<AgentBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});