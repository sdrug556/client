import { Component } from '@angular/core';
import config from 'devextreme/core/config';
import DataGrid, { Properties } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    config({ defaultCurrency: 'PHP' });
    // themes.current('generic.dark');
    const options: Properties = {
      searchPanel: {
        visible: true
      },
      headerFilter: {
        visible: false
      },
      filterRow: {
        visible: false
      }
    }
    DataGrid.defaultOptions({
      options: {
        searchPanel: {
          visible: true,
        },
      }
    });
  }
}
