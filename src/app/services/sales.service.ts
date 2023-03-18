import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '@types';
import { BaseService } from './base-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SalesService extends BaseService<Sale> {

  BASE_ROUTE = 'sale';

  constructor(private http: HttpClient) {
    super(http);
  }

  today(): Observable<any> {
    const url = environment.apiUrl + '/' + this.BASE_ROUTE + '/today';
    return this.http.get(url);
  }

  createSales(sales: any[]): Observable<any> {
    const url = environment.apiUrl + '/' + this.BASE_ROUTE;
    return this.http.post(url, sales);
  }

  cancelSale(cancelInfo: any): Observable<any> {
    const url = environment.apiUrl + '/' + this.BASE_ROUTE + '/cancel';
    return this.http.post(url, cancelInfo);
  }

  getClosingSale(): Observable<any[]> {
    const url = environment.apiUrl + '/' + this.BASE_ROUTE + '/closing';
    return this.http.get(url) as Observable<any[]>;
  }

  addClosingSale(closingSales: any): Observable<any> {
    const url = environment.apiUrl + '/' + this.BASE_ROUTE + '/closing';
    return this.http.post(url, closingSales);
  }

}
