import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card.component';
import { PhpCurrencyPipe } from '@pipes/currency.pipe';

@NgModule({
  declarations: [DashboardCardComponent, PhpCurrencyPipe],
  exports: [DashboardCardComponent],
  imports: [CommonModule],
})
export class DashboardCardModule {}
