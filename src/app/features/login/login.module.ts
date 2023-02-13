import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxLookupModule,
  DxSelectBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DxFormModule,
    DxButtonModule,
    DxValidatorModule,
    DxSelectBoxModule,
    DxLoadPanelModule,
    DxLookupModule,
  ],
})
export class LoginModule {}
