import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '@services/product.service';
import { ProductTransaction } from '@types';
import { DxNumberBoxComponent, DxPopupComponent, DxListComponent } from 'devextreme-angular';
import { Properties as dxButtonOptions } from 'devextreme/ui/button';
import notify from 'devextreme/ui/notify';
import { ValueChangedEvent } from 'devextreme/ui/number_box';
import { Properties as dxPopupOptions } from 'devextreme/ui/popup';
import validationEngine from "devextreme/ui/validation_engine";
import { first } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cashier-product-add',
  templateUrl: './cashier-product-add.component.html',
  styleUrls: ['./cashier-product-add.component.scss']
})
export class CashierProductAddComponent implements OnInit {

  @ViewChild('productsPopup') productsPopup?: DxPopupComponent;

  @ViewChild('productQtyPopup') productQtyPopup?: DxPopupComponent;

  @ViewChild('quantityNumberbox') quantityNumberbox: DxNumberBoxComponent;

  @ViewChild(DxListComponent) dxList: DxListComponent;

  @Output() onAddNewProduct = new EventEmitter<any>();

  @Input() selectedProducts: ProductTransaction[];

  selectedProductStock: number;

  popupOptions: dxPopupOptions = {
    deferRendering: true,
    visible: false
  }

  products: ProductTransaction[];

  buttons: { [key: string]: dxButtonOptions } = {
    add: {
      text: 'Add',
      onClick: () => {
        const validationResult = validationEngine.validateGroup('productAddValidator')
        if (!validationResult.isValid) {
          return notify('Invalid input value', 'error', 3000);
        }
        const editedProductQuantities = this.products.filter((product) => product.quantity);
        this.onAddNewProduct.emit(editedProductQuantities);
        this.productsPopup.instance.hide();
      }
    }
  }

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {}

  show(): void {
    this.productsPopup?.instance.show();
    this._productService.getAll()
      .pipe(
        first(),
        map((products: ProductTransaction[]) => {
          if (!this.selectedProducts?.length) { return products; }
          return products.map(product => {
            const selectedProduct = this.selectedProducts.find(p => p.id === product.id);
            if (selectedProduct) { product.quantity = selectedProduct.quantity; }
            console.log(product);
            return product;
          })
        })
      )
      .subscribe((products: any) => {
        this.products = products.filter((p) => p.stock > 0);
      });
  }

  onProductQuantityChange(e: ValueChangedEvent, product: ProductTransaction): void {
    product.quantity = e.value;
  }

  searchProduct(e: any): void {
    // this.dxList.instance.getDataSource().filter(['name', 'contains', e.value]);
    const dataSource = this.dxList.instance.getDataSource();
    dataSource.filter(['name', 'contains', e.value]);
    dataSource.reload();
  }

}
