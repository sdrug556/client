import { TestBed } from '@angular/core/testing';

import { HttpAuthorizationInterceptor } from './http-authorization.interceptor';

describe('HttpAuthorizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAuthorizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAuthorizationInterceptor = TestBed.inject(HttpAuthorizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
