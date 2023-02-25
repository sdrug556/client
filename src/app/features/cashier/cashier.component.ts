import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ProductService } from '@services/product.service';
import { SalesService } from '@services/sales.service';
import { ScannerService } from '@services/scanner.service';
import { SettingNoteType } from '@services/settings.service';
import { Product, ProductTransaction } from '@types';
import {
  DxDataGridComponent,
  DxNumberBoxComponent,
  DxPopupComponent,
} from 'devextreme-angular';
import { RowPreparedEvent } from 'devextreme/ui/data_grid';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import clone from 'lodash-es/clone';
import { Observable, of, Subscription } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { NotesViewerService } from 'src/app/components/notes-viewer/notes-viewer.service';
import { ProductQuantityService } from 'src/app/components/product-quantity/product-quantity.service';
import { calculateVAT } from 'src/app/utils';
import { CashierProductAddComponent } from './cashier-product-add/cashier-product-add.component';
import { CashierTodaySalesComponent } from './cashier-today-sales/cashier-today-sales.component';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
})
export class CashierComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dxDataGrid?: DxDataGridComponent;

  @ViewChild(CashierTodaySalesComponent) salesToday: CashierTodaySalesComponent;

  @ViewChild(CashierProductAddComponent)
  productAddComponent: CashierProductAddComponent;

  @ViewChild('settlePaymentPopup') settlePaymentPopup: DxPopupComponent;

  @ViewChild('cashNumberbox') cashNumberbox: DxNumberBoxComponent;

  @ViewChild('changeNumberbox') changeNumberbox: DxNumberBoxComponent;

  @ViewChild('toPrint') toPrint: ElementRef<HTMLElement>;

  transactionNo: number | null = null;

  transactionDate: Date | null = null;

  totalSales: number = 0;

  discounted: number = 0;

  vat: number = 0;

  vatable: number = 0;

  isNewTransaction = false;

  dateAndTimeNowId: any;

  dateAndTimeNow = new Date();

  selectedProducts: ProductTransaction[] = [];

  userDiscount = [
    {
      text: 'Senior/PWD',
      value: 5,
    },
  ];

  products: Product[];

  private _sub: Subscription;

  constructor(
    private _authService: AuthService,
    private _salesService: SalesService,
    private _noteViewerService: NotesViewerService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _scanner: ScannerService,
    private _productService: ProductService,
    private _productQuantityService: ProductQuantityService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const showNote = Boolean(
      this._activatedRoute.snapshot.queryParams['showNote']
    );
    if (showNote) {
      this._noteViewerService.show(SettingNoteType.Cashier);
      this._router.navigate(['.'], {
        queryParams: { showNote: null },
        relativeTo: this._activatedRoute,
      });
    }

    this._iniitializeScanning();
  }

  ngOnDestroy(): void {
    clearInterval(this.dateAndTimeNowId);
    this._scanner.detach('cashier');
    this._sub?.unsubscribe();
  }

  private _iniitializeScanning(): void {
    if (this._sub) {
      this._sub.unsubscribe();
      this._sub = null;
    }
    // @ts-ignore-next
    window.s = (id: string) => this._scanner.simulate('cashier', id);
    this._sub = this._loadProducts().subscribe((products) => {
      // this._scanner.detach('cashier');
      this._scanner
        .initialize('cashier', document)
        .pipe(
          tap(() => {
            if (!this.isNewTransaction) {
              this.newTransaction();
            }
          }),
          filter(({ code }) => {
            if (
              this.selectedProducts.findIndex((p) => p.barcode === code) > -1
            ) {
              notify('Product already added', 'warning', 3000);
              return false;
            }
            return true;
          }),
          map(({ code }) => {
            return {
              product: this.products.find((p) => p.barcode === code),
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
            return this._productQuantityService.show(result.product.stock).pipe(
              first(),
              map((qty) => {
                result.product.quantity = qty;
                return result.product;
              })
            );
          })
        )
        .subscribe((result) => {
          if (result) {
            this.onAddNewProduct([result] as ProductTransaction[]);
          }
        });
    });

  }

  private _loadProducts(): Observable<Product[]> {
    return this._productService.getAll().pipe(
      first(),
      map((products) => {
        this.products = products.filter((p) => p.stock > 0);
        return products;
      })
    );
  }

  private _calculateTotal(
    rowIndex: number,
    quantity: number,
    price: number
  ): void {
    const total = (quantity ?? 0) * price;
    this.dxDataGrid?.instance.cellValue(rowIndex, 'total', total);
  }

  private _caculateProductTotal(
    price: number,
    quantity: number,
    discount: number
  ): number {
    if (!discount) {
      return price * quantity;
    }
    const discountPercentage = discount / 100;
    return price * quantity - discountPercentage * price;
  }

  showSettlePayment(): void {
    if (!this.selectedProducts.length) {
      return notify('No Product added.', 'error', 3000);
    }
    this.settlePaymentPopup.instance.show();
  }

  private _calculateTotalSales(products: Product[]): void {
    this.totalSales = products.reduce((cur, prev) => {
      return (
        cur +
        this._caculateProductTotal(prev.price, prev.quantity, prev.discount)
      );
    }, 0);
    const totalSalesWithoutDiscount = products.reduce((cur, prev) => {
      return cur + this._caculateProductTotal(prev.price, prev.quantity, 0);
    }, 0);
    this.discounted = totalSalesWithoutDiscount - this.totalSales;

    this.vat = calculateVAT(this.totalSales);
    this.vatable = this.totalSales - this.vat;
  }

  private _generateRecieptContent(): string {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const rows = this.selectedProducts
      .map((product, index) => {
        return `
        <tr>
          <td>${product.name}</td>
          <td>${product.quantity ?? product.quantity}</td>
          <td>${formatter.format(product.price)}</td>
          <td>${formatter.format(product.total)}</td>
        </tr>
      `;
      })
      .join('\n');
    let content = `
    <div style="width: 100%" #toPrint>
      <div>
        <b>Invoice Number:</b>
        <span style="margin-left: 5px;">${this.transactionNo}</span>
      </div>
      <table width="100%" style="border-bottom: 2px solid #000">
        <thead>
          <tr>
            <th style="text-align: left;">Product</th>
            <th style="text-align: left;">Quantity</th>
            <th style="text-align: left;">Price</th>
            <th style="text-align: left;">Total</th>
          </tr>
        </thead>
        <tbody
            style="border-top: 2px solid #000; border-bottom: 2px solid #000"
            >
            ${rows}
        </tbody>
        <tfoot>
          <tr>
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: left">Amount Tendered</td>
            <td></td>
            <td></td>
            <td style="text-align: left">${formatter.format(
              this.changeNumberbox.value
            )}</td>
          </tr>
          <tr>
            <td style="text-align: left">Vatable</td>
            <td></td>
            <td></td>
            <td style="text-align: left">${formatter.format(this.vatable)}</td>
          </tr>
          <tr>
            <td style="text-align: left">Change</td>
            <td></td>
            <td></td>
            <td style="text-align: left">${formatter.format(
              this.changeNumberbox.value
            )}</td>
          </tr>
          <tr>
            <td style="text-align: left">VAT</td>
            <td></td>
            <td></td>
            <td style="text-align: left">${formatter.format(this.vat)}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Casher Name:</td>
            <td></td>
            <td></td>
            <td style="text-align: left">${
              this._authService.userInfo.firstName
            } ${this._authService.userInfo.lastName}</td>
          </tr>
        </tfoot>
      </table>
      <h4 style="text-align: center; margin-top: 40px">ORDER SLIP</h4>
      <p style="text-align: center">
      NOT VALID AS RECEIPT PLEASE ASK FOR OFFICIAL RECIEPT
      </p>
    </div>
    `;
    return content;
  }

  private _printReciept(): void {
    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
    iframe.contentWindow.document.body.innerHTML =
      this._generateRecieptContent();
    iframe.contentWindow.print();
  }

  addProduct(): void {
    if (!this.transactionNo) {
      return notify(
        'Press "New Transaction" button first before adding product.',
        'error',
        3000
      );
    }
    this.productAddComponent.show();
  }

  newTransaction(): void {
    this.transactionNo = Date.now();
    this.transactionDate = new Date();
    this.isNewTransaction = true;
    this.selectedProducts.length = 0;
  }

  cancelTransaction(): void {
    this.transactionNo = null;
    this.transactionDate = null;
    this.isNewTransaction = false;
    this.selectedProducts.length = 0;
  }

  addQty(e: any): void {
    const nextQty = (e.data.quantity ?? 0) + 1;
    if (nextQty > e.data.stock) {
      notify(
        `You can't add more than ${e.data.stock} quantity.`,
        'error',
        2000
      );
      this._calculateTotalSales(this.dxDataGrid.dataSource as Product[]);
      return;
    }
    this.dxDataGrid?.instance.cellValue(e.rowIndex, 'quantity', nextQty);
    this.dxDataGrid.dataSource[e.rowIndex].quantity = nextQty;
    this._calculateTotal(e.rowIndex, nextQty, e.data.price);
    this.dxDataGrid?.instance.cellValue(
      e.rowIndex,
      'total',
      this._caculateProductTotal(e.data.price, nextQty, e.data.discount)
    );
    this._calculateTotalSales(this.dxDataGrid.dataSource as Product[]);
  }

  subtractQty(e: any): void {
    const nextQty = (e.data.quantity ?? 0) - 1;
    if (nextQty <= 0) {
      this._calculateTotalSales(this.dxDataGrid.dataSource as Product[]);
      return;
    }
    this.dxDataGrid?.instance.cellValue(e.rowIndex, 'quantity', nextQty);
    this.dxDataGrid.dataSource[e.rowIndex].quantity = nextQty;
    this._calculateTotal(e.rowIndex, nextQty, e.data.price);
    this.dxDataGrid?.instance.cellValue(
      e.rowIndex,
      'total',
      this._caculateProductTotal(e.data.price, nextQty, e.data.discount)
    );
    this._calculateTotalSales(this.dxDataGrid.dataSource as Product[]);
  }

  deleteRow(e: any): void {
    this.dxDataGrid?.instance.deleteRow(e.rowIndex);
  }

  onRowPrepared(e: RowPreparedEvent): void {
    if (e.rowType === 'data') {
      e.data.total = this._caculateProductTotal(
        e.data.price,
        e.data.quantity,
        e.data.discount
      );
      this._calculateTotalSales(this.dxDataGrid.dataSource as Product[]);
    }
  }

  onAddNewProduct(productsToAdd: ProductTransaction[]): void {
    productsToAdd.forEach((item) => {
      item.total = this._caculateProductTotal(
        item.price,
        item.quantity,
        item.discount
      );
      const productIndex = this.selectedProducts.findIndex(
        (p) => p.id === item.id
      );
      if (productIndex !== -1) {
        this.selectedProducts.splice(productIndex, 1, clone(item));
      } else {
        this.selectedProducts.push(clone(item));
      }
    });
    // this._calculateTotalSales(this.selectedProducts);
  }

  todaySales(): void {
    this.salesToday.show();
  }

  async logout(): Promise<void> {
    const isConfirmed = await confirm(
      'Are you sure you want to logout?',
      'Logout'
    );
    if (isConfirmed) {
      await this._authService.logout();
    }
  }

  cashValueChanged(e: any, changeNumberbox: DxNumberBoxComponent): void {
    changeNumberbox.instance.option('value', e.value - this.totalSales);
  }

  settlePayment(): void {
    const sales = clone(this.selectedProducts).map((sale) => {
      sale.invoiceNumber = this.transactionNo;
      sale.productId = sale.id as number;
      sale.quantity = sale.quantity;
      sale.discount = sale.discount ?? 0;
      sale.cash = +this.cashNumberbox.value;
      delete sale.id;
      // delete sale.quantity;
      return sale;
    });
    this._salesService
      .createSales(sales)
      .pipe(first())
      .subscribe((res) => {
        this.settlePaymentPopup.instance.hide();
        notify('Transaction successfully.', 'success', 3000);
        this._printReciept();
        this.cancelTransaction();
        this._calculateTotalSales([]);
        this._loadProducts().subscribe();
      });
  }
  showNote(): void {
    this._noteViewerService.show(SettingNoteType.Cashier);
  }
}
