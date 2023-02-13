import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsSalesComponent } from './reports-sales.component';
import { ReportsSalesRoutingModule } from './reports-sales-routing.module';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ReportsSalesComponent
  ],
  imports: [
    CommonModule,
    ReportsSalesRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxDateBoxModule
  ]
})
export class ReportsSalesModule { }
