import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsNoteComponent } from './reports-note.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsNoteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsNoteRoutingModule {}
