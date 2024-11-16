import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFromPaymentRegistrationComponent } from './back-from-payment-registration.component';

describe('BackFromPaymentRegistrationComponent', () => {
  let component: BackFromPaymentRegistrationComponent;
  let fixture: ComponentFixture<BackFromPaymentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackFromPaymentRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackFromPaymentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
