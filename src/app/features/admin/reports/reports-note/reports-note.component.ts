import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { SettingNoteType, SettingsService } from '@services/settings.service';
import notify from 'devextreme/ui/notify';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-reports-note',
  templateUrl: './reports-note.component.html',
  styleUrls: ['./reports-note.component.scss'],
})
export class ReportsNoteComponent implements OnInit {
  note: any = {};

  isSaving = false;

  constructor(
    private _settingsService: SettingsService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._settingsService
      .getNoteByType(SettingNoteType.Admin)
      .pipe(take(1))
      .subscribe((res) => {
        this.note = res;
      });
  }

  save(e: any): void {
    if (this.isSaving) return;
    const data = [
      {
        ...this.note,
        ...{
          note: this.note.note,
          type: SettingNoteType.Admin,
          createdDate: Date.now(),
          createdBy: this._authService.userInfo.id,
        },
      },
    ];
    this._settingsService
      .saveNote(data)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe(() => notify('Notes successfully saved', 'success', 3000));
  }
}
