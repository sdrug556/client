import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsClosingCashComponent } from './reports-closing-cash.component';

describe('ReportsClosingCashComponent', () => {
  let component: ReportsClosingCashComponent;
  let fixture: ComponentFixture<ReportsClosingCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsClosingCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsClosingCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
