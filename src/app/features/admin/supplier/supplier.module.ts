import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    SupplierComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    DxDataGridModule
  ]
})
export class SupplierModule { }
