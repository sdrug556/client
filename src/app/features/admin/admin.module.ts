import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import {
  DxListModule,
  DxScrollViewModule,
  DxTreeViewModule
} from 'devextreme-angular';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { UserinfoModule } from 'src/app/components/userinfo/userinfo.module';
import { NotificationModule } from 'src/app/components/notification/notification.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DxListModule,
    DxScrollViewModule,
    DxTreeViewModule,
    BreadcrumbsModule,
    UserinfoModule,
    NotificationModule
  ]
})
export class AdminModule { }
