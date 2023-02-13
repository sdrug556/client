import { TestBed } from '@angular/core/testing';

import { LoginHistoryService } from './login-history.service';

describe('LoginHistoryService', () => {
  let service: LoginHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
