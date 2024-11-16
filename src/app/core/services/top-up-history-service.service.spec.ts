import { TestBed } from '@angular/core/testing';

import { TopUpHistoryServiceService } from './top-up-history-service.service';

describe('TopUpHistoryServiceService', () => {
  let service: TopUpHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopUpHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
