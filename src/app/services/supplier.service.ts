import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '@types';

@Injectable({ providedIn: 'root' })
export class SupplierService extends BaseService<Supplier> {
  BASE_ROUTE = 'supplier';
  constructor(http: HttpClient) { super(http); }

}
