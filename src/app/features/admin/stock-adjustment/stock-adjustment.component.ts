import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdjustmentStockService } from '@services/adjustmentstock.service';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { ScannerService } from '@services/scanner.service';
import { SupplierService } from '@services/supplier.service';
import { AdjustmentStock, Product, Supplier } from '@types';
import { format } from 'date-fns';
import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { HiddenEvent, ShowingEvent } from 'devextreme/ui/popup';
import { filter, finalize, first, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { createArrayStore } from 'src/app/utils';
import { StockAdjustmentHistoryComponent } from './stock-adjustment-history/stock-adjustment-history.component';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.scss'],
  host: { class: 'default-app-style' },
})
export class StockAdjustmentComponent extends ComponentBase implements OnInit {
  @ViewChild('productsDatagrid') productsDatagrid: DxDataGridComponent;

  @ViewChild(DxPopupComponent) dxPopup: DxPopupComponent;

  @ViewChild(StockAdjustmentHistoryComponent)
  history: StockAdjustmentHistoryComponent;

  showLoading = false;

  showProducts = false;

  // @ts-ignore-next
  suppliers: Supplier[] = [];

  selectedProducts: Partial<AdjustmentStock>[] = [];

  // @ts-ignore-next
  products: any = [];

  formData = {
    stockInBy: `${this._authService.userInfo.firstName} ${this._authService.userInfo.lastName}`,
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
            // @ts-ignore-next
            barcode: product.barcode,
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
    private _stockAdjustmentService: AdjustmentStockService,
    private _authService: AuthService,
    private _scanner: ScannerService,
    private _cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    // @ts-ignore-next
    window.s = (id: string) => this._scanner.simulate('cashier', id);
    this._supplierService
      .getAll()
      .pipe(first())
      .subscribe((suppliers) => {
        this.suppliers = createArrayStore(suppliers);
      });

    this._scanner
      .initialize('cashier', document)
      .pipe(
        filter(({ code }) => {
          if (!this.products?.store?.data?.length) {
            if (!this.formData.supplier) {
              notify('Please select supplier first', 'error', 3000);
            }
            return false;
          }

          if (
            // @ts-ignore-next
            this.selectedProducts.findIndex((p) => p.barcode === code) > -1
          ) {
            notify('Product already added', 'warning', 3000);
            return false;
          }
          return true;
        }),
        map(({ code }) => {
          return {
            product: this.products.store?.data?.find((p) => p.barcode === code),
            code,
          };
        }),
        mergeMap((result) => {
          if (!result.product) {
            notify(
              `Product with barcode of: ${result.code}`,
              'warning',
              3000
            );
            return of(null);
          }
          return of(result);
        })
      )
    .subscribe((result) => {
      if (!result) {
        return;
      }
      this.selectedProducts.push({
        // @ts-ignore-next
        barcode: result.product.barcode,
        productId: result.product.id,
        // @ts-ignore-next
        name: result.product.name,
        currentStock: result.product.stock,
      });
      this._cdr.detectChanges();
      // if (result) {
      //   this.onAddNewProduct([result] as ProductTransaction[]);
      // }
    });
  }

  ngOnDestroy(): void {
    this._scanner.detach('cashier');
  }

  showProductBySupplier(): void {
    this.showProducts = true;
  }

  productListOnHidden(e: HiddenEvent): void {
    this.productsDatagrid.instance.deselectAll();
    // this.products = null;
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

  onFieldDataChanged(e: any): void {
    if (e.dataField === 'supplier') {
      if (e.value) {
        this._productService
          .getProductBySupplier(e.value)
          .pipe(first())
          .subscribe((products) => {
            this.products = createArrayStore(products as any);
            console.log(this.products);
          });
      } else {
        this.products.length = 0;
      }
    }
    console.log(e);
  }

  async adjustStock(): Promise<void> {
    const modifiedQuantities = this.selectedProducts.filter((p) => p.stock);
    if (!modifiedQuantities.length) {
      notify('No stock is modified', 'error', 3000);
      return;
    }

    if (modifiedQuantities.length !== this.selectedProducts.length) {
      notify(
        'Some of the selected products stock is/are not adjusted.',
        'error',
        3000
      );
    }

    const isConfirmed = await confirm(
      'Are you sure you want to adjust Quantities?',
      'Adjust Quantity'
    );
    if (isConfirmed) {
      this.showLoading = true;
      this._stockAdjustmentService
        .adjustStock(this.selectedProducts)
        .pipe(
          finalize(() => (this.showLoading = false)),
          first()
        )
        .subscribe(() => {
          notify('Successfully adjust stocks.', 'success', 3000);
          this.selectedProducts = [];
          this.formData.supplier = null;
        });
    }
  }

  onSelectionChanged(e: any): void {
    setTimeout(() => {
      const el = e.element as HTMLElement;
      el.querySelectorAll('.dx-tabpanel-tabs .dx-item')?.[1].addEventListener(
        'click',
        () => {
          this.history.load();
        }
      );
    });
  }
}
