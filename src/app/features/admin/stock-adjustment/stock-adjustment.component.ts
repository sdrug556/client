import { Component, OnInit, ViewChild } from '@angular/core';
import { AdjustmentStockService } from '@services/adjustmentstock.service';
import { ProductService } from '@services/product.service';
import { SupplierService } from '@services/supplier.service';
import { AdjustmentStock, Product, Supplier } from '@types';
import { format } from 'date-fns';
import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { HiddenEvent, ShowingEvent } from 'devextreme/ui/popup';
import { finalize, first } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { createArrayStore } from 'src/app/utils';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.scss'],
  host: { class: 'default-app-style' },
})
export class StockAdjustmentComponent extends ComponentBase implements OnInit {
  @ViewChild('productsDatagrid') productsDatagrid: DxDataGridComponent;

  @ViewChild(DxPopupComponent) dxPopup: DxPopupComponent;

  showLoading = false;

  showProducts = false;

  // @ts-ignore-next
  suppliers: Supplier[] = [];

  selectedProducts: Partial<AdjustmentStock>[] = [];

  // @ts-ignore-next
  products: Product[] = [];

  formData = {
    stockInBy: 'Mark',
    stockInDate: format(new Date(), 'MMMM dd yyyy h:m bbbb'),
    supplier: '',
  };

  addProducts = {
    text: 'Add Selected Products',
    onClick: () => {
      const selectedProducts = this.productsDatagrid.instance
        .getSelectedRowsData()
        ?.map((product) => {
          return {
            productId: product.id,
            name: product.name,
            currentStock: product.stock,
          };
        });
      if (!selectedProducts.length) {
        return;
      }
      this.selectedProducts.push(...selectedProducts);
      this.dxPopup.instance.hide();
    },
  };

  constructor(
    private _supplierService: SupplierService,
    private _productService: ProductService,
    private _stockAdjustmentService: AdjustmentStockService
  ) {
    super();
  }

  ngOnInit(): void {
    this._supplierService
        .getAll()
        .pipe(first())
        .subscribe(suppliers => {
          this.suppliers = createArrayStore(suppliers)
        });
  }

  showProductBySupplier(): void {
    this.showProducts = true;
  }

  productListOnHidden(e: HiddenEvent): void {
    this.productsDatagrid.instance.deselectAll();
    this.products = null;
  }

  productListOnShowing(e: ShowingEvent): void {
    if (!this.formData.supplier) {
      e.cancel = true;
      return;
    }
    this._productService
        .getProductBySupplier(+this.formData.supplier)
        .pipe(first())
        .subscribe((products) => {
          this.products = createArrayStore(products as any);
        });
  }

  async adjustStock(): Promise<void> {
    const modifiedQuantities = this.selectedProducts.filter(p => p.stock);
    if (!modifiedQuantities.length) {
      notify('No stock is modified', 'error', 3000);
      return;
    }

    if (modifiedQuantities.length !== this.selectedProducts.length) {
      notify('Some of the selected products stock is/are not adjusted.', 'error', 3000);
    }

    const isConfirmed = await confirm('Are you sure you want to adjust Quantities?', 'Adjust Quantity');
    if (isConfirmed) {
      this.showLoading = true;
      this._stockAdjustmentService
        .adjustStock(this.selectedProducts)
        .pipe(
          finalize(() => this.showLoading = false),
          first()
        )
        .subscribe(() => {
          notify('Successfully adjust stocks.', 'success', 3000);
        });
    }
  }
}
