import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsClosingCashComponent } from './reports-closing-cash.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsClosingCashComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsClosingCashRoutingModule {}
