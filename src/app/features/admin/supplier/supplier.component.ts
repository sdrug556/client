import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupplierService } from '@services/supplier.service';
import { Supplier } from '@types';
import { SavingEvent } from 'devextreme/ui/data_grid';
import { first } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { handleOnSaving } from 'src/app/utils';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  host: { class: 'default-app-style' }
})
export class SupplierComponent extends ComponentBase implements OnInit, OnDestroy {

  supplier: Supplier[];

  constructor(private _supplierService: SupplierService) {
    super();
  }

  ngOnInit(): void {
    this._getAll();
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  private _getAll(): void {
    this._supplierService
      .getAll()
      .pipe(first())
      .subscribe((res) => {
        this.supplier = res as Supplier[];
      });
  }

  onSaving(e: SavingEvent): void {
    handleOnSaving(this._supplierService, e, () => this._getAll());
  }

}
