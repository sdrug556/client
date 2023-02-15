import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { CashierGuard } from './guards/cashier.guard';

const routes: Routes = [
  {
    path: 'admin',
    data: { breadcrumbs: 'Admin' },
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('@features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cashier',
    data: { breadcrumbs: 'Cashier' },
    canActivate: [CashierGuard],
    loadChildren: () =>
      import('@features/cashier/cashier.module').then((m) => m.CashierModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('@features/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
