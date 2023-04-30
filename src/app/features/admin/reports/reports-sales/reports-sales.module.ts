import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { ReportsSalesRoutingModule } from './reports-sales-routing.module';
import { ReportsSalesComponent } from './reports-sales.component';

@NgModule({
  declarations: [ReportsSalesComponent],
  imports: [
    CommonModule,
    ReportsSalesRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxDateBoxModule,
    DxSelectBoxModule,
  ],
})
export class ReportsSalesModule {}
