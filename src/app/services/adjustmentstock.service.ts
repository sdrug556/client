import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdjustmentStock } from '@types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class AdjustmentStockService extends BaseService<AdjustmentStock> {
  BASE_ROUTE = 'adjustmentstock';

  constructor(private http: HttpClient) { super(http); }

  adjustStock(adjustmentStocks: Partial<AdjustmentStock>[]): Observable<boolean> {
    const url = `${environment.apiUrl}/${this.BASE_ROUTE}`;
    return this.http.post(url, adjustmentStocks, {
      observe: 'response'
    }) as any;
  }

}
