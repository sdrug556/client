import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './users-manager.component';
import { UsersManagerRoutingModule } from './users-manager-routing.module';
import { DxDataGridModule, DxDateBoxModule, DxSwitchModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    UsersManagerComponent
  ],
  imports: [
    CommonModule,
    UsersManagerRoutingModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxSwitchModule,
  ]
})
export class UsersManagerModule { }
