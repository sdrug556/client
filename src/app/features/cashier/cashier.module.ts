import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxListModule,
  DxLookupModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { NotesViewerModule } from 'src/app/components/notes-viewer/notes-viewer.module';
import { ProductQuantityModule } from 'src/app/components/product-quantity/product-quantity.module';
import { CashierProductAddComponent } from './cashier-product-add/cashier-product-add.component';
import { CashierRoutingModule } from './cashier-routing.module';
import { CashierTodaySalesComponent } from './cashier-today-sales/cashier-today-sales.component';
import { CashierComponent } from './cashier.component';
import { CasherCashCountComponent } from './casher-cash-count/casher-cash-count.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CashierComponent,
    CashierProductAddComponent,
    CashierTodaySalesComponent,
    CasherCashCountComponent,
  ],
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
    NotesViewerModule,
    ProductQuantityModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CashierModule {}
