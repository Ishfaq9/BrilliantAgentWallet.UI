import { TestBed } from '@angular/core/testing';

import { AgentNoticeBoardServiceService } from './agent-notice-board-service.service';

describe('AgentNoticeBoardServiceService', () => {
  let service: AgentNoticeBoardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentNoticeBoardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
