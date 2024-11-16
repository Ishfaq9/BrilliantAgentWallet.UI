import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpHistoryComponent } from './top-up-history.component';

describe('TopUpHistoryComponent', () => {
  let component: TopUpHistoryComponent;
  let fixture: ComponentFixture<TopUpHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUpHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopUpHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
