import { TestBed } from '@angular/core/testing';

import { UIHelperService } from './u-i-helper.service';

describe('UIHelperService', () => {
  let service: UIHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
