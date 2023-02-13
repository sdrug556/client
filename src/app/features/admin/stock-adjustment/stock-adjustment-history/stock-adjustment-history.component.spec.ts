import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdjustmentHistoryComponent } from './stock-adjustment-history.component';

describe('StockAdjustmentHistoryComponent', () => {
  let component: StockAdjustmentHistoryComponent;
  let fixture: ComponentFixture<StockAdjustmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAdjustmentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAdjustmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
