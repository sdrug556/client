import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '@services/product.service';
import { first } from 'rxjs/operators';
import { ClickEvent } from 'devextreme/ui/button';
import { DxDataGridComponent } from 'devextreme-angular';
import { endOfToday } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports-products',
  templateUrl: './reports-products.component.html',
  styleUrls: ['./reports-products.component.scss']
})
export class ReportsProductsComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dxDataGrid: DxDataGridComponent;

  products: any[];

  activeButton: string;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._productService.getAll()
      .pipe(
        first()
      )
      .subscribe(products => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        });
        const today = +endOfToday();
        this.products = products.map((product: any) => {
          product.price = formatter.format(product.price) as any;
          product.isExpired = product.expiration < today;
          product.lowStock = product.stock <= product.reorderPoint || product.stock < 0;
          product.expiration = new Date(+product.expiration);
          product.createdDate = new Date(+product.createdDate);
          return product;
        });
        console.table(this.products);
        if (this._activatedRoute.snapshot.queryParams['activeButton']) {
          this.activeButton = this._activatedRoute.snapshot.queryParams['activeButton'];
          setTimeout(() => this._filterByActiveButton());
        }
      });
  }

  filterClicked(e: ClickEvent): void {
    this.activeButton = e.component.option('text');
    console.log(this.activeButton);
    this._filterByActiveButton();
  }

  private _filterByActiveButton(): void {
    switch (this.activeButton) {
      case 'Low Stocks':
        this.dxDataGrid.instance.filter(['lowStock', '=', true]);
        break;
      case 'Expired':
        this.dxDataGrid.instance.filter(['isExpired', '=', true]);
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
