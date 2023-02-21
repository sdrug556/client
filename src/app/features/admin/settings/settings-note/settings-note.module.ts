import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxButtonModule } from 'devextreme-angular';
import { QuillModule } from 'ngx-quill';
import { SettingsNoteRoutingModule } from './settings-note-routing.module';
import { SettingsNoteComponent } from './settings-note.component';

@NgModule({
  declarations: [SettingsNoteComponent],
  imports: [
    CommonModule,
    SettingsNoteRoutingModule,
    QuillModule,
    DxButtonModule,
    FormsModule,
  ],
})
export class SettingsNoteModule {}
