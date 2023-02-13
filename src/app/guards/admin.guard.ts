import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ADMIN, CASHIER } from '@services/user.service';
import { tryJsonParse } from '../utils';
import { USER_INFO_TOKEN } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): boolean | UrlTree {
    const cached = tryJsonParse<any>(localStorage.getItem(USER_INFO_TOKEN));
    switch (cached?.type) {
      case ADMIN:
        return true;
      case CASHIER:
        return this._router.parseUrl('/cashier');
    }
    return this._router.parseUrl('/login');
  }
}
