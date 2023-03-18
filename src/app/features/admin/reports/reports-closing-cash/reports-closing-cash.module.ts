import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { ReportsClosingCashRoutingModule } from './reports-closing-cash-routing.module';
import { ReportsClosingCashComponent } from './reports-closing-cash.component';

@NgModule({
  declarations: [ReportsClosingCashComponent],
  imports: [CommonModule, ReportsClosingCashRoutingModule, DxDataGridModule],
})
export class ReportsClosingCashModule {}
