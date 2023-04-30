import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { SupplierService } from '@services/supplier.service';
import { Category, Product, Supplier } from '@types';
import { DxDataGridComponent } from 'devextreme-angular';
import { InitNewRowEvent, SavingEvent } from 'devextreme/ui/data_grid';
import { first, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ComponentBase } from 'src/app/components/component-base';
import {
  createArrayStore,
  currencyFormatter,
  handleOnSaving,
} from 'src/app/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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
      zip([this._categoryService.getAll(), this._supplierService.getAll()]),
      ([categories, suppliers]) => {
        this.categories = createArrayStore(categories);
        this.suppliers = createArrayStore(suppliers);
        this.load();
      }
    );
  }

  loadCategories(): void {
    this._categoryService
      .getAll()
      .pipe(take(1))
      .subscribe((categories) => {
        console.log(categories);
        this.categories = createArrayStore(categories);
      });
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  load(): void {
    this._productService
      .getAll()
      .pipe(
        map((products) => {
          return products.map((product) => {
            product.expiration = new Date(+product.expiration);
            product.createdDate = new Date(+product.createdDate);
            return product;
          });
        }),
        first()
      )
      .subscribe((products) => {
        this.products = products;
      });
  }

  currencyFormat(product: Product): string {
    return currencyFormatter(product.price);
  }

  onSaving(e: SavingEvent): void {
    handleOnSaving(this._productService, e, () => this.load());
  }

  onInitNewRow(e: InitNewRowEvent): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    e.data = {
      status: true,
      createdDate: +today,
    };
  }

  calculateFilterExpression(
    filterValue: any,
    selectedFilterOperation: any,
    target: any
  ) {
    const self = this as any;
    console.log(filterValue, selectedFilterOperation, target);
    // Override implementation for the "between" filter operation
    // if (selectedFilterOperation === "between" && $.isArray(filterValue)) {
    //   const filterExpression = [
    //     [self.dataField, ">", filterValue[0]],
    //     "and",
    //     [self.dataField, "<", filterValue[1]]
    //   ];
    //   return filterExpression;
    // }
    // Invoke the default implementation for other filter operations
    if (
      target === 'search' &&
      (self.dataField === 'name' || self.dataField === 'description')
    ) {
      return [self.dataField, 'startswith', filterValue];
    }
    return self.defaultCalculateFilterExpression
      ? self.defaultCalculateFilterExpression.apply(this, arguments)
      : [];
  }

  search(e: any): void {
    if (!e.value) {
      return this.grid.instance.clearFilter();
    }
    this.grid.instance
      .getDataSource()
      .filter([
        ['name', 'startswith', e.value],
        'or',
        ['description', 'startswith', e.value],
      ]);
  }
}
