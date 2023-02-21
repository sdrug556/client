import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsTransactionComponent } from './reports-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsTransactionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsTransactionRoutingModule {}
