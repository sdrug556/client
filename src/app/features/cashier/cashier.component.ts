import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Product, ProductTransaction } from '@types';
import { format } from 'date-fns';
import { DxDataGridComponent, DxNumberBoxComponent, DxPopupComponent } from 'devextreme-angular';
import { RowPreparedEvent } from 'devextreme/ui/data_grid';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import clone from 'lodash-es/clone';
import { CashierProductAddComponent } from './cashier-product-add/cashier-product-add.component';
import { CashierTodaySalesComponent } from './cashier-today-sales/cashier-today-sales.component';
import { SalesService } from '@services/sales.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
})
export class CashierComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dxDataGrid?: DxDataGridComponent;

  @ViewChild(CashierTodaySalesComponent) salesToday: CashierTodaySalesComponent;

  @ViewChild(CashierProductAddComponent) productAddComponent: CashierProductAddComponent;

  @ViewChild('settlePaymentPopup') settlePaymentPopup: DxPopupComponent;

  @ViewChild('cashNumberbox') cashNumberbox: DxNumberBoxComponent;

  @ViewChild('changeNumberbox') changeNumberbox: DxNumberBoxComponent;

  transactionNo: number | null = null;

  transactionDate: Date | null = null;

  totalSales: number = 0;

  discounted: number = 0;

  isNewTransaction = false;

  dateAndTimeNowId: any;

  dateAndTimeNow = new Date();

  selectedProducts: ProductTransaction[] = [];

  constructor(private _authService: AuthService, private _salesService: SalesService) {
  }

  ngOnInit(): void {
    // @ts-ignore-next
    window.sample = this;
    this.dateAndTimeNowId = setInterval(() => {
      this.dateAndTimeNow = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.dateAndTimeNowId);
  }

  private _calculateTotal(rowIndex: number, quantity: number, price: number): void {
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
    return (price * quantity) - discountPercentage * price;
  }

  showSettlePayment(): void {
    if (!this.selectedProducts.length) {
      return notify('No Product added.', 'error', 3000);
    }
    this.settlePaymentPopup.instance.show();
  }

  private _calculateTotalSales(products: Product[]): void {
    this.totalSales = products.reduce((cur, prev) => {
      return cur + this._caculateProductTotal(prev.price, prev.quantity, prev.discount);
    }, 0);
    const totalSalesWithoutDiscount = products.reduce((cur, prev) => {
      return cur + this._caculateProductTotal(prev.price, prev.quantity, 0);
    }, 0);
    this.discounted = totalSalesWithoutDiscount - this.totalSales;
    console.log(this.discounted)
  }

  private _generateRecieptContent(): string {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const rows = this.selectedProducts.map((product, index) => {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${formatter.format(product.price)}</td>
          <td>${product.quantity ?? product.quantity}</td>
          <td>${formatter.format(product.total)}</td>
        </tr>
      `
    }).join('\n');
    let content = `
      <div width="100%" height="100%">
        <h1 align="center"><b>HyperSaver DrugStore</b></h1>
        <div align="left">Cashier: Sample</div>
        <div align="left">Invoice #: ${this.transactionNo}</div>
        <div align="left">Date and Time: ${format(new Date(), 'MM-dd-yyyy H:MM:SS aaa')}</div>
        <table style="margin-top: 10px; width: 100%">
          <thead>
            <tr>
              <th></th>
              <th style="text-align: left;">Name</th>
              <th style="text-align: left;">Price</th>
              <th style="text-align: left;">Qty</th>
              <th style="text-align: left;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        <div align="left" style="display: flex;width: 100%;margin-top: 10px;">
          <div style="font-weight: bold">Total</div>
          <div style="margin-left: auto;">${ formatter.format(this.totalSales) }</div>
        </div>
        <div align="left" style="display: flex;width: 100%;margin-top: 10px;">
          <div style="font-weight: bold">Amount Tendered</div>
          <div style="margin-left: auto;">${ formatter.format(this.cashNumberbox.value) }</div>
        </div>
        <div align="left" style="display: flex;width: 100%;margin-top: 10px;">
          <div style="font-weight: bold">Change</div>
          <div style="margin-left: auto;">${ formatter.format(this.changeNumberbox.value) }</div>
        </div>
        <div align="left" style="display: flex;width: 100%;text-align: center;margin-top: 10px;">
          <h1 style="text-align: center;">Thank you!!!</h1>
        </div>
      </div>
    `;
    return content;
  }

  private _printReciept(): void {
    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
    iframe.contentWindow.document.body.innerHTML = this._generateRecieptContent();
    iframe.contentWindow.print();
  }

  addProduct(): void {
    if (!this.transactionNo) {
      return notify('Press "New Transaction" button first before adding product.', 'error', 3000);
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
      const productIndex = this.selectedProducts.findIndex(p => p.id === item.id);
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
    const isConfirmed = await confirm('Are you sure you want to logout?', 'Logout');
    if (isConfirmed) {
      await this._authService.logout();
    }
  }

  cashValueChanged(e: any, changeNumberbox: DxNumberBoxComponent): void {
    changeNumberbox.instance.option('value', e.value - this.totalSales);
  }

  settlePayment(): void {
    const sales = clone(this.selectedProducts).map(sale => {
      sale.invoiceNumber = this.transactionNo;
      sale.productId = sale.id as number;
      sale.quantity = sale.quantity;
      sale.discount = sale.discount ?? 0;
      delete sale.id;
      // delete sale.quantity;
      return sale;
    });
    console.log(sales);
    this._salesService.createSales(sales)
      .pipe(first())
      .subscribe(res => {
        this.settlePaymentPopup.instance.hide();
        notify('Transaction successfully.', 'success', 3000);
        this._printReciept();
        this.cancelTransaction();
      });
  }

}
