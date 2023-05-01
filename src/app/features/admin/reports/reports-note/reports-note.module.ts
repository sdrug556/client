import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxButtonModule } from 'devextreme-angular';
import { QuillModule } from 'ngx-quill';
import { ReportsNoteRoutingModule } from './reports-note-routing.module';
import { ReportsNoteComponent } from './reports-note.component';

@NgModule({
  declarations: [ReportsNoteComponent],
  imports: [
    CommonModule,
    ReportsNoteRoutingModule,
    DxButtonModule,
    QuillModule,
    FormsModule,
  ],
})
export class ReportsNoteModule {}
