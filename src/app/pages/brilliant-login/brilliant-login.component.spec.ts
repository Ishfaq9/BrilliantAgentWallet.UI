import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrilliantLoginComponent } from './brilliant-login.component';

describe('BrilliantLoginComponent', () => {
  let component: BrilliantLoginComponent;
  let fixture: ComponentFixture<BrilliantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrilliantLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrilliantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
