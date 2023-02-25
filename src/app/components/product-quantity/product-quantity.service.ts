import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductQuantityService {

  options$ = new Subject<{
    min: number;
    max: number;
    show: boolean;
  }>();

  submit$ = new Subject<number>();

  constructor() {}

  show(max: number): Observable<number> {
    this.options$.next({
      max: max,
      min: 0,
      show: true
    });
    return of(true)
      .pipe(mergeMap(() => this.submit$));
  }

  submit(qty: number): void {
    this.submit$.next(qty);
  }

}
