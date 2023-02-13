import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  host: {
    class: 'cursor-pointer',
    '(click)': 'click($event)'
  }
})
export class DashboardCardComponent implements OnInit {

  @Input() title?: string;

  @Input() item?: number | string;

  @Input() url: string;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  click(e: any): void {
    if (this.url) {
      this._router.navigateByUrl(this.url);
    }
  }

}
