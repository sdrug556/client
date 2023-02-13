import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export function dateToNumber(data: any) {
  const keys = Object.keys(data);
  keys.forEach(key => {
    if (data[key] instanceof Date) {
      data[key].setHours(0, 0, 0, 0);
      data[key] = +data[key];
    }
  })
  return data;
}

interface Item {
  id: string | number;
  isDeleted?: boolean;
}

export abstract class BaseService<T extends Item> {

  abstract BASE_ROUTE: string;

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getAll(): Observable<T[]> {
    return this._http
      .get(environment.apiUrl + '/' + this.BASE_ROUTE)
      .pipe(map((x) => x as T[]))
  }

  get(id: number): Observable<T> {
    return this._http
      .get(environment.apiUrl + '/' + this.BASE_ROUTE + '/' + id, {
        observe: 'response'
      })
      .pipe(map((x) => x as any))
  }

  add(data: T): Observable<number> {
    return this._http
      .post(environment.apiUrl + '/' + this.BASE_ROUTE, data, {
        observe: 'response'
      })
      .pipe(map((x) => x.body as any))
  }

  update(id: number, data: T): Observable<boolean> {
    return this._http
      .put(environment.apiUrl + '/' + this.BASE_ROUTE + '/' + id, data, {
        observe: 'response'
      })
      .pipe(map((x) => x.body as any))
  }

  delete(id: number): Observable<boolean> {
    return this._http
      .delete(environment.apiUrl + '/' + this.BASE_ROUTE + '/' + id, {
        observe: 'response'
      })
      .pipe(map((x) => true));
  }

}
