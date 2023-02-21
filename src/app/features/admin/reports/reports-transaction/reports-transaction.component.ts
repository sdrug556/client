import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '@services/sales.service';
import { ProductTransaction } from '@types';
import {
  endOfDay,
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { DxDataGridComponent, DxListComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { ClickEvent } from 'devextreme/ui/button';
import uniqBy from 'lodash-es/uniqBy';
import { first, map } from 'rxjs/operators';
import { calculateVAT, printReciept } from 'src/app/utils';

@Component({
  selector: 'app-reports-transaction',
  templateUrl: './reports-transaction.component.html',
  styleUrls: ['./reports-transaction.component.scss'],
})
export class ReportsTransactionComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dxDataGrid: DxDataGridComponent;
  @ViewChild(DxListComponent) dxList: DxListComponent;

  @ViewChild('toPrint') toPrint: ElementRef<HTMLElement>;

  sales: ProductTransaction[] = [];

  listDataSource: any[];

  activeSales: any[] = [];

  activeButton: string;
  vat: number;
  vatable: number;
    total: number;

  constructor(
    private salesService: SalesService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.salesService
      .getAll()
      .pipe(
        map((sales) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
          });
          return sales.map((sale: any) => {
            sale.total = this._caculateProductTotal(
              sale.price,
              sale.quantity,
              sale.discount
            );
            sale.total = formatter.format(sale.total);
            sale.createdDateFilter = +sale.createdDate;
            sale.createdDate = new Date(+sale.createdDate);
            // sale.discount = `${sale.discount}%`;
            // sale.price = formatter.format(sale.price);
            return sale;
          });
        }),
        first()
      )
      .subscribe((res: any) => {
        this.sales = res;
        this.listDataSource = uniqBy(res, 'invoiceNumber');
      });
  }

  private _caculateProductTotal(
    price: number,
    qty: number,
    discount: number
  ): number {
    if (!discount) {
      return price * qty;
    }
    const discountPercentage = discount / 100;
    return price * qty - discountPercentage * price;
  }

  filterClicked(e: ClickEvent): void {
    this.activeButton = e.component.option('text');
    this._filterByActiveButton();
  }

  private _filterByActiveButton(): void {
    switch (this.activeButton) {
      case 'Sales Today':
        this.dxDataGrid.instance.filter([
          ['createdDate', '<', +endOfToday()],
          'and',
          ['createdDate', '>', +startOfToday()],
        ]);
        break;
      case 'Sales this Week':
        this.dxDataGrid.instance.filter([
          ['createdDate', '<', +startOfWeek(new Date())],
          'and',
          ['createdDate', '>', +endOfWeek(new Date())],
        ]);
        break;
      case 'Sales this Month':
        this.dxDataGrid.instance.filter([
          ['createdDate', '<', +endOfMonth(new Date())],
          'and',
          ['createdDate', '>', +startOfMonth(new Date())],
        ]);
        break;
      case 'Sales this Year':
        this.dxDataGrid.instance.filter([
          ['createdDate', '<', +endOfYear(new Date())],
          'and',
          ['createdDate', '>', +startOfYear(new Date())],
        ]);
        break;
      case 'Sales last Month':
      case 'Sales this Month':
        const today = new Date();
        const dateLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        this.dxDataGrid.instance.filter([
          ['createdDate', '<', +endOfMonth(dateLastMonth)],
          'and',
          ['createdDate', '>', +startOfMonth(dateLastMonth)],
        ]);
        break;
      default:
        this.dxDataGrid.instance.filter(null);
        break;
    }
  }

  generateReport(): void {
    this.dxDataGrid.instance.exportToExcel(false);
  }

  onItemClick(e: any): void { const invoiceId = e.itemData.invoiceNumber; let total = 0;
    const activeSales = this.sales.filter((s) => {
      if (s.invoiceNumber === invoiceId) {
        s.total = this._caculateProductTotal(s.price, s.quantity, s.discount);
        total += s.total;
        return true;
      }
      return false;
    });
    this.total = total;
    this.vat = calculateVAT(total);
    this.vatable = total - this.vat;
    this.activeSales = activeSales;
  }

  onDateFilterChanged(e: any): void {
    const dataSource = this.dxList.instance.getDataSource();
    const startOfDate = +startOfDay(e.value);
    const endOfDate = +endOfDay(e.value);
    dataSource.filter([
      ['createdDateFilter', '>', startOfDate],
      'and',
      ['createdDateFilter', '<', endOfDate]
    ]);
    dataSource.load();
  }

  onPrint(e: any): void {
    printReciept(`Reciept-${new Date()}`, this.toPrint.nativeElement)
  }
}
