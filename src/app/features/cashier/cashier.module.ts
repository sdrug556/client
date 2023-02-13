import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierComponent } from './cashier.component';
import { CashierRoutingModule } from './cashier-routing.module';
import {
  DxButtonModule,
  DxDataGridModule,
  DxListModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxFormModule,
  DxLookupModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { CashierProductAddComponent } from './cashier-product-add/cashier-product-add.component';
import { CashierTodaySalesComponent } from './cashier-today-sales/cashier-today-sales.component';

@NgModule({
  declarations: [CashierComponent, CashierProductAddComponent, CashierTodaySalesComponent],
  imports: [
    CommonModule,
    CashierRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxScrollViewModule,
    DxPopupModule,
    DxListModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxFormModule,
    DxLookupModule,
    DxTextAreaModule,
  ],
})
export class CashierModule {}
