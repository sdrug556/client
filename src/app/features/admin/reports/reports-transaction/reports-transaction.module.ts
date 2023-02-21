import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportsTransactionRoutingModule } from './reports-transaction-routing.module';
import { ReportsTransactionComponent } from './reports-transaction.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxListModule } from 'devextreme-angular';

@NgModule({
  declarations: [ReportsTransactionComponent],
  imports: [
    CommonModule,
    ReportsTransactionRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxListModule,
    DxDateBoxModule,
  ],
})
export class ReportsTransactionModule {}
