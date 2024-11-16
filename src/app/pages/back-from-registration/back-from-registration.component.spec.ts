import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFromRegistrationComponent } from './back-from-registration.component';

describe('BackFromRegistrationComponent', () => {
  let component: BackFromRegistrationComponent;
  let fixture: ComponentFixture<BackFromRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackFromRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackFromRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
