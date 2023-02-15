import { TestBed } from '@angular/core/testing';

import { ApiurlInterceptor } from './apiurl.interceptor';

describe('ApiurlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiurlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiurlInterceptor = TestBed.inject(ApiurlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
