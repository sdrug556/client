import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@types';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService<Category> {
  BASE_ROUTE = 'category';
  constructor(http: HttpClient) { super(http); }
}
