import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '@services/sales.service';
import { ProductTransaction } from '@types';
import { map, first } from 'rxjs/operators';
import { DxDataGridComponent } from 'devextreme-angular';
import { ClickEvent } from 'devextreme/ui/button';
import {
  startOfToday,
  endOfToday,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports-sales',
  templateUrl: './reports-sales.component.html',
  styleUrls: ['./reports-sales.component.scss'],
  host: { class: 'default-app-style' },
})
export class ReportsSalesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dxDataGrid: DxDataGridComponent;

  sales: ProductTransaction[] = [];

  activeButton: string;

  constructor(private salesService: SalesService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.salesService
      .getAll()
      .pipe(
        map((sales) => {
          return sales.map((sale: any) => {
            sale.total = this._caculateProductTotal(
              sale.price,
              sale.quantity,
              sale.discount
            );
            sale.createdDate = new Date(+sale.createdDate);
            return sale;
          });
        }),
        first()
      )
      .subscribe((res: any) => {
        this.sales = res;
        if (this._activatedRoute.snapshot.queryParams['activeButton']) {
          this.activeButton = this._activatedRoute.snapshot.queryParams['activeButton'];
          setTimeout(() => this._filterByActiveButton());
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
}
