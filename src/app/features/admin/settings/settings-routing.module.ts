import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'notes',
        data: { breadcrumbs: 'Notes' },
        loadChildren: () =>
          import('./settings-note/settings-note.module').then(
            (m) => m.SettingsNoteModule
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'notes',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
