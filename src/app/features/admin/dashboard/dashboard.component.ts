import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'default-app-style' },
})
export class DashboardComponent implements OnInit {
  items: any[] = [];

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this._dashboardService
      .getAll()
      .pipe(first())
      .subscribe((items) => {
        const keys = Object.keys(items);
        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        });

        keys.forEach((key) => {
          console.log(key);
          const obj: any = {
            title: this.format(key),
            value: key.startsWith('sales') ? formatter.format(items[key]) : items[key],
          }
          switch (key) {
            case 'salesToday':
              obj.url = '/admin/reports/sales?activeButton=Sales Today';
              break;
            case 'salesThisWeek':
              obj.url = '/admin/reports/sales?activeButton=Sales this Week'
              break;
            case 'salesThisMonth':
              obj.url = '/admin/reports/sales?activeButton=Sales this Month';
              break;
            case 'salesLastMonth':
              obj.url = '/admin/reports/sales?activeButton=Sales last Month';
              break;
            case 'productLowStock':
              obj.url = '/admin/reports/products?activeButton=Low Stocks';
              break;
            case 'productExpired':
              obj.url = '/admin/reports/products?activeButton=Expired';
              break;
          }
          this.items.push(obj);
        });
      });
  }

  private format(key: string): string {
    return key
      .split('')
      .map((char, index) => {
        if (index === 0) {
          return char.toUpperCase();
        }
        // check if character is uppercase
        if (char === char.toUpperCase()) {
          return ' ' + char;
        }
        return char;
      })
      .join('');
  }
}
