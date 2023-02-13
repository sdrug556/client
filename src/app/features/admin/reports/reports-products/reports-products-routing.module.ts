import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsProductsComponent } from './reports-products.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsProductsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsProductsRoutingModule {}
