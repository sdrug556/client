import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTransactionComponent } from './reports-transaction.component';

describe('ReportsTransactionComponent', () => {
  let component: ReportsTransactionComponent;
  let fixture: ComponentFixture<ReportsTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
