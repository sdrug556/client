import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<Product> {
  BASE_ROUTE = 'product';
  constructor(private http: HttpClient) { super(http); }

  getProductBySupplier(id: number): Observable<Product> {
    const url = `${environment.apiUrl}/product/supplier/${id}`;
    return this.http.get(url) as Observable<Product>;
  }
}
