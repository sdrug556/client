import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCache } from '@types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tryJsonParse } from '../utils';
import { delay, first, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const ACCESS_TOKEN_KEY = 'access-token-key';

export const USER_INFO_TOKEN = 'user-token-key';

@Injectable({ providedIn: 'root' })
export class AuthService {

  get accessToken() {
    return localStorage[ACCESS_TOKEN_KEY];
  }

  get userInfo() {
    return tryJsonParse<User>(localStorage[USER_INFO_TOKEN]);
  }


  constructor(private _http: HttpClient, private _router: Router) {}

  login(email: string, password: string): Observable<User> {
    const url = environment.apiUrl + '/login';
    return this._http.post(url, { email, password }, { observe: 'response' })
      .pipe(
        map((x: any) => {
          const info = tryJsonParse<any>(atob(x.body.token.split('.')[1]))?.user;
          localStorage.setItem(USER_INFO_TOKEN, JSON.stringify(info));
          localStorage.setItem(ACCESS_TOKEN_KEY, x.body.token);
          return info;
        }),
      ) as Observable<User>;
  }

  async logout(): Promise<void> {
    this._http.get(`${environment.apiUrl}/logout`)
      .pipe(first())
      .subscribe(() => {
        localStorage.removeItem(USER_INFO_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        this._router.navigateByUrl('/login');
      });
  }

}
