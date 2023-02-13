import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginHistory } from '@types';
import { Observable } from 'rxjs';
import { numberToDate } from '../utils';
import { BaseService } from './base-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginHistoryService extends BaseService<LoginHistory> {
  BASE_ROUTE = 'history/login';
  constructor(http: HttpClient) {
    super(http);
  }

  override getAll(): Observable<LoginHistory[]> {
    return super.getAll()
    .pipe(
      map((histories) => {
        return histories.map((history) => {
          history.createdDate = numberToDate(+history.createdDate);
          return history;
        });
      })
    )
  }
}
