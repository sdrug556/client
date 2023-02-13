import { Component } from '@angular/core';
import config from 'devextreme/core/config';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    config({ defaultCurrency: 'PHP' })
    // themes.current('generic.dark');
  }
}
