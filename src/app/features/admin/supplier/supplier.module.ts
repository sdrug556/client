import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxDataGridModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTextBoxModule,
  DxLoadIndicatorModule
} from 'devextreme-angular';
import { QuillModule } from 'ngx-quill';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    DxDataGridModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTextBoxModule,
    QuillModule,
    FormsModule
  ],
})
export class SupplierModule {}
