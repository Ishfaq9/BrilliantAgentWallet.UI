import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRechargeComponent } from './customer-recharge.component';

describe('CustomerRechargeComponent', () => {
  let component: CustomerRechargeComponent;
  let fixture: ComponentFixture<CustomerRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRechargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
