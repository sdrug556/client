import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'sales',
        data: { breadcrumbs: 'Sales' },
        loadChildren: () =>
          import('./reports-sales/reports-sales.module').then(
            (m) => m.ReportsSalesModule
          ),
      },
      {
        path: 'products',
        data: { breadcrumbs: 'Products' },
        loadChildren: () =>
          import('./reports-products/reports-products.module').then(
            (m) => m.ReportsProductsModule
          ),
      },
      {
        path: 'transactions',
        data: { breadcrumbs: 'Transactions' },
        loadChildren: () =>
          import('./reports-transaction/reports-transaction.module').then(
            (m) => m.ReportsTransactionModule
          ),
      },
      {
        path: 'closing-cash',
        data: { breadcrumbs: 'Closing Cash Count Report' },
        loadChildren: () =>
          import('./reports-closing-cash/reports-closing-cash.module').then(
            (m) => m.ReportsClosingCashModule
          ),
      },
      {
        path: 'note',
        data: { breadcrumbs: 'Note' },
        loadChildren: () =>
          import('./reports-note/reports-note.module').then(
            (m) => m.ReportsNoteModule
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'sales'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
