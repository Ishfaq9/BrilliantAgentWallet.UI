import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsRegComponent } from './payment-methods-reg.component';

describe('PaymentMethodsRegComponent', () => {
  let component: PaymentMethodsRegComponent;
  let fixture: ComponentFixture<PaymentMethodsRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodsRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentMethodsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
