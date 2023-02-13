import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService<any> {

  BASE_ROUTE = 'dashboard';

  constructor(http: HttpClient) {
    super(http);
  }

}
