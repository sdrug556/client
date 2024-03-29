import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { DashboardService } from '@services/dashboard.service';
import { SettingNoteType, SettingsService } from '@services/settings.service';
import notify from 'devextreme/ui/notify';
import { first, take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'default-app-style' },
})
export class DashboardComponent implements OnInit {
  items: any[] = [];
  isSaving: any;

  constructor(
    private _dashboardService: DashboardService,
    private _settingsService: SettingsService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._dashboardService
      .getAll()
      .pipe(first())
      .subscribe((items) => {
        console.log(items);
        const keys = Object.keys(items);
        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP',
        });

        const _items: any[] = [];
        keys.forEach((key) => {
          const obj: any = {
            // title: this.format(key),
            value: key.startsWith('sales')
              ? formatter.format(items[key])
              : items[key],
          };
          switch (key) {
            // case 'salesToday':
            //   obj.url = '/admin/reports/sales?activeButton=Sales Today';
            //   break;
            // case 'salesThisWeek':
            //   obj.url = '/admin/reports/sales?activeButton=Sales this Week';
            //   break;
            // case 'salesThisMonth':
            //   obj.url = '/admin/reports/sales?activeButton=Sales this Month';
            //   break;
            // case 'salesLastMonth':
            //   obj.url = '/admin/reports/sales?activeButton=Sales last Month';
            //   break;
            case 'userCount':
              obj.title = 'User Manager';
              obj.url = '/admin/users/manager';
              break;
            case 'supplierCount':
              obj.title = 'Supplier Information';
              obj.url = '/admin/supplier';
              break;
            case 'productCount':
              obj.title = 'Products';
              obj.url = '/admin/products';
              break;
            case 'productLowStock':
              obj.title = 'Low Stocks';
              obj.url = '/admin/reports/products?activeButton=Low Stocks';
              break;
            case 'productExpired':
              obj.title = 'Expired Products';
              obj.url = '/admin/reports/products?activeButton=Expired';
              break;
            // case 'salesThisYear':
            //   obj.title = '';
            //   obj.url = '/admin/reports/sales?activeButton=Sales this Year';
            //   break;
          }
          _items.push(obj);
        });
        console.log(_items);
        this.items = _items;
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
