import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFromPaymentComponent } from './back-from-payment.component';

describe('BackFromPaymentComponent', () => {
  let component: BackFromPaymentComponent;
  let fixture: ComponentFixture<BackFromPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackFromPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackFromPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
