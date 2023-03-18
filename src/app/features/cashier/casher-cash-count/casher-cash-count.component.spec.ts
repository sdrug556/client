import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasherCashCountComponent } from './casher-cash-count.component';

describe('CasherCashCountComponent', () => {
  let component: CasherCashCountComponent;
  let fixture: ComponentFixture<CasherCashCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasherCashCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasherCashCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
