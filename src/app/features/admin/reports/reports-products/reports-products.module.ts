import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { ReportsProductsRoutingModule } from './reports-products-routing.module';
import { ReportsProductsComponent } from './reports-products.component';

@NgModule({
  declarations: [ReportsProductsComponent],
  imports: [
    CommonModule,
    ReportsProductsRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
  ],
})
export class ReportsProductsModule {}
