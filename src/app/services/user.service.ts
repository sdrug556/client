import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@types';
import { BaseService } from './base-service';

export const ADMIN = 1;
export const CASHIER = 2;

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {

  BASE_ROUTE = 'user';

  repoName = 'userInformation';

  static userType = [
    {
      value: ADMIN,
      text: 'Admin',
    },
    {
      value: CASHIER,
      text: 'Cashier',
    },
  ];

  constructor(private _router: Router, private http: HttpClient) {
    super(http);
  }

}
