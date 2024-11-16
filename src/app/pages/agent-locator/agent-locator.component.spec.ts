import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLocatorComponent } from './agent-locator.component';

describe('AgentLocatorComponent', () => {
  let component: AgentLocatorComponent;
  let fixture: ComponentFixture<AgentLocatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentLocatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
