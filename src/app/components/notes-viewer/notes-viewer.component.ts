import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { NotesViewerService } from './notes-viewer.service';
import { mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-notes-viewer',
  templateUrl: './notes-viewer.component.html',
  styleUrls: ['./notes-viewer.component.scss'],
})
export class NotesViewerComponent implements OnInit {
  content = '';

  visible = false;

  constructor(
    private _settingsService: SettingsService,
    private _notesViewerService: NotesViewerService
  ) {}

  ngOnInit(): void {
    this._notesViewerService.show$
      .pipe(
        mergeMap((options) => {
          if (!options.show) {
            this.visible = false;
            return of(false)
          }
          return this._settingsService.
            getNoteByType(options.type);
        }),
        map((note) => {
          if (note === false) {
            return null;
          }
          this.content = note?.note ?? 'Content not yet set.';
          this.visible = true;
        })
      ).subscribe();
  }

  onHidden(e: any): void {
    this.visible = false;
  }

}
