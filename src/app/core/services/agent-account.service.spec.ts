import { TestBed } from '@angular/core/testing';

import { AgentAccountService } from './agent-account.service';

describe('AgentAccountService', () => {
  let service: AgentAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
