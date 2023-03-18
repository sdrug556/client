import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { SettingNoteType, SettingsService } from '@services/settings.service';
import notify from 'devextreme/ui/notify';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-settings-note',
  templateUrl: './settings-note.component.html',
  styleUrls: ['./settings-note.component.scss'],
})
export class SettingsNoteComponent implements OnInit {
  //   @ViewChild('cashierNote') cashierNote: QuillEditorComponent;
  //   @ViewChild('adminNote') adminNote: QuillEditorComponent;

  cashierNoteContent: string;
  adminNoteContent: string;

  isSaving = false;

  cashierNote: any;
  adminNote: any;

  constructor(
    private _settingsService: SettingsService,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    // this._settingsService.getNote().subscribe((res) => {
    //   this.cashierNote = res?.find((n) => n.type === SettingNoteType.Cashier);
    //   this.adminNote = res?.find((n) => n.type === SettingNoteType.Admin);

    //   this.cashierNoteContent = this.cashierNote?.note
    //   this.adminNoteContent = this.adminNote?.note;
    // });
  }

  save(e: any): void {
    if (this.isSaving) return;
    const data = [
      {
        ...this.cashierNote,
        ...{
          note: this.cashierNoteContent,
          type: SettingNoteType.Cashier,
          createdDate: Date.now(),
          createdBy: this._authService.userInfo.id,
        },
      },
      {
        ...this.adminNote,
        ...{
          note: this.adminNoteContent,
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
