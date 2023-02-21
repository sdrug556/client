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
import { CashierProductAddComponent } from './cashier-product-add/cashier-product-add.component';
import { CashierRoutingModule } from './cashier-routing.module';
import { CashierTodaySalesComponent } from './cashier-today-sales/cashier-today-sales.component';
import { CashierComponent } from './cashier.component';

@NgModule({
  declarations: [
    CashierComponent,
    CashierProductAddComponent,
    CashierTodaySalesComponent,
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
  ],
})
export class CashierModule {}
