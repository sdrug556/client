import { TestBed } from '@angular/core/testing';

import { CashierGuard } from './cashier.guard';

describe('CashierGuard', () => {
  let guard: CashierGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CashierGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
