import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { custom } from 'devextreme/ui/dialog';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export enum SettingNoteType {
  Cashier,
  Admin,
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private _http: HttpClient) {}

  getNote(): Observable<any> {
    const url = environment.apiUrl + '/settings/note';
    return this._http.get(url);
  }

  saveNote(settings: any): Observable<any> {
    const url = environment.apiUrl + '/settings/note';
    return this._http.post(url, settings);
  }

  getNoteByType(type: SettingNoteType): Observable<any> {
    const url = environment.apiUrl + `/settings/note/${type}`;
    return this._http.get(url);
  }

  showNote(type: SettingNoteType): Observable<any> {
    const url = environment.apiUrl + `/settings/note/${type}`;
    const dialog$ = (content: string) => {
      const customDialog = custom({
        title: 'Note',
        messageHtml: content,
      }).show();
      return from(customDialog);
    }
    return this._http.get(url)
      .pipe(
        mergeMap((note: any) => dialog$(note?.note ?? 'No Content Set yet.'))
      );
  }

}
