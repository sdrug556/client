import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { QuillModule } from 'ngx-quill';
import { NotesViewerComponent } from './notes-viewer.component';
import { NotesViewerService } from './notes-viewer.service';

@NgModule({
  declarations: [NotesViewerComponent],
  exports: [NotesViewerComponent],
  imports: [CommonModule, DxPopupModule, QuillModule, DxScrollViewModule],
  providers: [NotesViewerService],
})
export class NotesViewerModule {}
