import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '@types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SupplierService extends BaseService<Supplier> {
  BASE_ROUTE = 'supplier';
  constructor(private http: HttpClient) { super(http); }

  sendEmail(option: {
    to: string;
    email: string;
    body: string;
    subject: string;
  }): Observable<boolean> {
    const url = environment.apiUrl + '/' + this.BASE_ROUTE + '/request-order';
    return this.http.post(url, option)
      .pipe(
        map((result) => {
          console.log(result);
          return Boolean(result);
        })
      );
  }
}
