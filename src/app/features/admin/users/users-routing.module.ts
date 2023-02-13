import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'manager',
        data: { breadcrumbs: 'User Manager' },
        loadChildren: () =>
          import(
            '@features/admin/users/users-manager/users-manager.module'
          ).then((m) => m.UsersManagerModule),
      },
      {
        path: 'login-history',
        data: { breadcrumbs: 'Login History' },
        loadChildren: () =>
          import(
            '@features/admin/users/login-history/login-history.module'
          ).then((m) => m.LoginHistoryModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'manager'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
