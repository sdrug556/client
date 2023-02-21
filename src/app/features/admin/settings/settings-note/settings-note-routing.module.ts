import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsNoteComponent } from './settings-note.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsNoteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsNoteRoutingModule {}

