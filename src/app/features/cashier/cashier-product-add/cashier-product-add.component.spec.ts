import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierProductAddComponent } from './cashier-product-add.component';

describe('CashierProductAddComponent', () => {
  let component: CashierProductAddComponent;
  let fixture: ComponentFixture<CashierProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierProductAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
