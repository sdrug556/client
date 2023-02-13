import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxDropDownButtonModule } from 'devextreme-angular';
import { UserinfoComponent } from './userinfo.component';

@NgModule({
  declarations: [UserinfoComponent],
  exports: [UserinfoComponent],
  imports: [CommonModule, DxDropDownButtonModule]
})
export class UserinfoModule { }
