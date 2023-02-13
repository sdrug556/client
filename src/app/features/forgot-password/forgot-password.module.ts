import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { DxButtonModule, DxFormModule, DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    DxFormModule,
    DxButtonModule,
    DxLoadPanelModule
  ]
})
export class ForgotPasswordModule { }
