import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxPopoverModule, DxListModule } from 'devextreme-angular';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, DxPopoverModule, DxListModule]
})
export class NotificationModule { }
