import { TestBed } from '@angular/core/testing';

import { CustomerRechargeServiceService } from './customer-recharge-service.service';

describe('CustomerRechargeServiceService', () => {
  let service: CustomerRechargeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRechargeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
