import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHistoryRoutingModule } from './login-history-routing.module';
import { LoginHistoryComponent } from './login-history.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [LoginHistoryComponent],
  imports: [
    CommonModule,
    LoginHistoryRoutingModule,
    DxDataGridModule
  ]
})
export class LoginHistoryModule { }
