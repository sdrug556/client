import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        data: { breadcrumbs: 'Dashboard' },
        loadChildren: () =>
          import('@features/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'categories',
        data: { breadcrumbs: 'Categories' },
        loadChildren: () =>
          import('@features/admin/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'products',
        data: { breadcrumbs: 'Products' },
        loadChildren: () =>
          import('@features/admin/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'supplier',
        data: { breadcrumbs: 'Supplier' },
        loadChildren: () =>
          import('@features/admin/supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
      },
      {
        path: 'users',
        data: { breadcrumbs: 'Users' },
        loadChildren: () =>
          import('@features/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'stock-adjustment',
        data: { breadcrumbs: 'Stock Adjustment' },
        loadChildren: () =>
          import(
            '@features/admin/stock-adjustment/stock-adjustment.module'
          ).then((m) => m.StockAdjustmentModule),
      },
      {
        path: 'reports',
        data: { breadcrumbs: 'Reports' },
        loadChildren: () =>
          import('@features/admin/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'profile',
        data: { breadcrumbs: 'Profile' },
        loadChildren: () =>
          import('@features/admin/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
