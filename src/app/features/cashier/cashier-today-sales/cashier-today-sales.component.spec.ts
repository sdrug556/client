import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierTodaySalesComponent } from './cashier-today-sales.component';

describe('CashierTodaySalesComponent', () => {
  let component: CashierTodaySalesComponent;
  let fixture: ComponentFixture<CashierTodaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierTodaySalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierTodaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
