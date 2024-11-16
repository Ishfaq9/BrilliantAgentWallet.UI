import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAgentListComponent } from './sub-agent-list.component';

describe('SubAgentListComponent', () => {
  let component: SubAgentListComponent;
  let fixture: ComponentFixture<SubAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAgentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
