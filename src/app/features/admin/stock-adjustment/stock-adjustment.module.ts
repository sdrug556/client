import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockAdjustmentComponent } from './stock-adjustment.component';
import { StockAdjustmentRoutingModule } from './stock-adjustment-routing.module';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxLoadPanelModule,
  DxLookupModule,
  DxPopupModule,
  DxTabPanelModule,
} from 'devextreme-angular';
import { StockAdjustmentHistoryComponent } from './stock-adjustment-history/stock-adjustment-history.component';

@NgModule({
  declarations: [StockAdjustmentComponent, StockAdjustmentHistoryComponent],
  imports: [
    CommonModule,
    StockAdjustmentRoutingModule,
    DxFormModule,
    DxDataGridModule,
    DxPopupModule,
    DxLookupModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxTabPanelModule,
  ],
})
export class StockAdjustmentModule {}
