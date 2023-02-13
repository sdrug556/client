import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { SupplierService } from '@services/supplier.service';
import { Category, Product, Supplier } from '@types';
import { DxDataGridComponent } from 'devextreme-angular';
import { InitNewRowEvent, SavingEvent } from 'devextreme/ui/data_grid';
import { first, zip } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { map } from 'rxjs/operators';
import {
  createArrayStore,
  currencyFormatter,
  handleOnSaving,
  notifySuccess,
} from 'src/app/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  host: { class: 'default-app-style' },
})
export class ProductsComponent
  extends ComponentBase
  implements OnInit, OnDestroy
{
  @ViewChild(DxDataGridComponent) grid?: DxDataGridComponent;

  products: Product[] = [];

  categories: Category[] = [];

  suppliers: Supplier[] = [];

  priceEditorOptions = {
    type: 'currency',
    onKeyDown: (e: any) => {
      const E_KEY = 69;
      if (e.event.which === E_KEY) {
        e.event.preventDefault();
      }
    },
  };

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService
  ) {
    super();
  }

  ngOnInit(): void {
    super.subscribe(
      zip([
        this._categoryService.getAll(),
        this._supplierService.getAll()
      ]),
      ([categories, suppliers]) => {
        this.categories = createArrayStore(categories);
        this.suppliers = createArrayStore(suppliers);
        this._getAll();
      }
    );
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  private _getAll(): void {
    this._productService.getAll()
      .pipe(
        map((products) => {
          return products.map(product => {
            product.expiration = new Date(+product.expiration);
            product.createdDate = new Date(+product.createdDate);
            return product;
          });
        }),
        first()
      )
      .subscribe(products => {
        this.products = products;
      })
  }

  currencyFormat(product: Product): string {
    return currencyFormatter(product.price);
  }

  onSaving(e: SavingEvent): void {
    handleOnSaving(this._productService, e, () => this._getAll());
  }

  onInitNewRow(e: InitNewRowEvent): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    e.data = {
      status: true,
      createdDate: +today,
    };
  }
}
