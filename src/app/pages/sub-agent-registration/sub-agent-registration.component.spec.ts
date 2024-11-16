import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAgentRegistrationComponent } from './sub-agent-registration.component';

describe('SubAgentRegistrationComponent', () => {
  let component: SubAgentRegistrationComponent;
  let fixture: ComponentFixture<SubAgentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAgentRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubAgentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
