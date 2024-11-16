import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBoardDetailsComponent } from './notice-board-details.component';

describe('NoticeBoardDetailsComponent', () => {
  let component: NoticeBoardDetailsComponent;
  let fixture: ComponentFixture<NoticeBoardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeBoardDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticeBoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
