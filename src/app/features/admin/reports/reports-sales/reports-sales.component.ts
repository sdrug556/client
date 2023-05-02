import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '@services/sales.service';
import { ProductTransaction } from '@types';
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { DxDataGridComponent } from 'devextreme-angular';
import { ClickEvent } from 'devextreme/ui/button';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-reports-sales',
  templateUrl: './reports-sales.component.html',
  styleUrls: ['./reports-sales.component.scss'],
})
export class ReportsSalesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dxDataGrid: DxDataGridComponent;

  sales: ProductTransaction[] = [];

  activeButton: string;

  filters = [
    {
      text: 'Sales Today',
    },
    {
      text: 'Sales this Week',
    },
    {
      text: 'Sales this Month',
    },
    {
      text: 'Sales last Month',
    },
    {
      text: 'Sales this Year',
    },
    {
      text: 'All',
    },
  ];

  filterValue = 'All';

  currencyFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  });

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
            sale.totalNonFormatter = sale.total;
            sale.total = formatter.format(sale.total);
            sale.createdDateFilter = +sale.createdDate;
            sale.createdDate = new Date(+sale.createdDate);
            sale.discount = `${sale.discount}%`;
            sale.priceNonFormatter = sale.price;
            sale.price = this.currencyFormatter.format(sale.price);
            // sale.price = sale.price;
            return sale;
          });
        }),
        first()
      )
      .subscribe((res: any) => {
        this.sales = res;
        if (this._activatedRoute.snapshot.queryParams['activeButton']) {
          this.filterValue =
            this._activatedRoute.snapshot.queryParams['activeButton'];
          // this.activeButton = this._activatedRoute.snapshot.queryParams['activeButton'];
          // setTimeout(() => this._filterByActiveButton());
        }
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

  filterChanged(e: any): void {
    this.activeButton = e.value;
    this._filterByActiveButton();
  }

  private _filterByActiveButton(): void {
    switch (this.activeButton) {
      case 'Sales Today':
        this.dxDataGrid.instance.filter([
          ['createdDateFilter', '<', +endOfToday()],
          'and',
          ['createdDateFilter', '>', +startOfToday()],
        ]);
        break;
      case 'Sales this Week':
        this.dxDataGrid.instance.filter([
          ['createdDateFilter', '>', +startOfWeek(new Date())],
          'and',
          ['createdDateFilter', '<', +endOfWeek(new Date())],
        ]);
        break;
      case 'Sales this Month':
        this.dxDataGrid.instance.filter([
          ['createdDateFilter', '<', +endOfMonth(new Date())],
          'and',
          ['createdDateFilter', '>', +startOfMonth(new Date())],
        ]);
        break;
      case 'Sales this Year':
        this.dxDataGrid.instance.filter([
          ['createdDateFilter', '<', +endOfYear(new Date())],
          'and',
          ['createdDateFilter', '>', +startOfYear(new Date())],
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

  customPriceText = (e: any) => {
    return this.currencyFormatter.format(e.value);
  };

  calculatePriceDisplayValue = (property: string) => {
    return (e: any) => {
      return this.currencyFormatter.format(e[property]);
    }
  };

  calculateCustomSummaryTotal = (e: any) => {
    if (e.name === 'totalSummary' && e.summaryProcess === 'finalize') {
      const total = this.sales.reduce((prev, cur) => {
        return prev + cur.totalNonFormatter;
      }, 0);
      e.totalValue = this.currencyFormatter.format(parseFloat(total.toFixed(2)));
    }

    if (e.name === 'totalPrice' && e.summaryProcess === 'finalize') {
      console.log(e);
      const total = this.sales.reduce((prev, cur) => {
        return prev + cur.priceNonFormatter;
      }, 0);
      e.totalValue = this.currencyFormatter.format(parseFloat(total.toFixed(2)));
    }
  }

}
