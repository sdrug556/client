import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxLoadPanelModule,
  DxLookupModule,
  DxTextAreaModule,
  DxTextBoxModule,
} from 'devextreme-angular';

const DEVEXTREME = [
  DxFormModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxButtonModule,
  DxTextAreaModule,
  DxLookupModule,
  DxLoadPanelModule
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, ...DEVEXTREME],
})
export class RegisterModule {}
