import { Injectable } from '@angular/core';
import { SettingNoteType } from '@services/settings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesViewerService {
  show$ = new BehaviorSubject<{
    show: boolean;
    type: SettingNoteType;
  }>({ show: false, type: SettingNoteType.Admin });

  constructor() {}

  show(type: SettingNoteType): void {
    this.show$.next({
      show: true,
      type,
    });
  }
}
