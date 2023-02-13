import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxPopoverModule } from 'devextreme-angular';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, DxPopoverModule]
})
export class NotificationModule { }
