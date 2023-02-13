import { TestBed } from '@angular/core/testing';

import { AdjustmentstockService } from './adjustmentstock.service';

describe('AdjustmentstockService', () => {
  let service: AdjustmentstockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjustmentstockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
