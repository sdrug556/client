import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsProductsComponent } from './reports-products.component';
import { ReportsProductsRoutingModule } from './reports-products-routing.module';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ReportsProductsComponent
  ],
  imports: [
    CommonModule,
    ReportsProductsRoutingModule,
    DxDataGridModule,
    DxButtonModule
  ]
})
export class ReportsProductsModule { }
