import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '@services/dashboard.service';
import { ShowingEvent } from 'devextreme/ui/popover';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  count: number = 0;

  items: any[] = [];

  notificationItems: any[] = [];

  constructor(
    private _dashboardService: DashboardService,
    private _router: Router,
  ) { }

  onShowing(e: ShowingEvent): void {
    if (!this.count) e.cancel = true;
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
        let count = 0;
        const notificationItems: any[] = [];
        keys.forEach((key) => {
          const obj: any = {
            title: this.format(key),
            value: key.startsWith('sales')
              ? formatter.format(items[key])
              : items[key],
          };
          switch (key) {
            case 'productLowStock':
              obj.url = '/admin/reports/products?activeButton=Low Stocks';
              notificationItems.push({
                title: 'product with low on stocks',
                value: items[key],
                url: '/admin/reports/products?activeButton=Low Stocks'
              });
              break;
            case 'productExpired':
              obj.url = '/admin/reports/products?activeButton=Expired';
              notificationItems.push({
                title: 'expired products',
                value: items[key],
                url: '/admin/reports/products?activeButton=Expired'
              });
              break;
          }
          this.items.push(obj);
          this.count = notificationItems.length;
          this.notificationItems = notificationItems;
        });
        console.log(this.items);
      });
  }

  itemClicked(e: any, popover: any): void {
    this._router.navigateByUrl(e.itemData.url)
      .then(() => popover.instance.hide());
  }

}
