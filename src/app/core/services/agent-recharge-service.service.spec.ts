import { TestBed } from '@angular/core/testing';

import { AgentRechargeServiceService } from './agent-recharge-service.service';

describe('AgentRechargeServiceService', () => {
  let service: AgentRechargeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentRechargeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
