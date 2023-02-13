import { Component, OnInit } from '@angular/core';
import { ShowingEvent } from 'devextreme/ui/popover';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  count: number = 0;

  constructor() { }

  onShowing(e: ShowingEvent): void {
    if (!this.count) e.cancel = true;
  }

  ngOnInit(): void {
  }

}
