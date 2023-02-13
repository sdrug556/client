import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.get('Authorization')) {
      const headers = request.headers
        .set('Authorization', 'Bearer ' + this._authService.accessToken)
        .set('Content-Type', 'application/json');
      return next.handle(request.clone({ headers }));
    }
    return next.handle(request.clone());
  }
}
