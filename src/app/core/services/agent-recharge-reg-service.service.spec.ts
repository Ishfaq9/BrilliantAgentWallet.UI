import { TestBed } from '@angular/core/testing';

import { AgentRechargeRegServiceService } from './agent-recharge-reg-service.service';

describe('AgentRechargeRegServiceService', () => {
  let service: AgentRechargeRegServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentRechargeRegServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
