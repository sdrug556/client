import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxNumberBoxModule,
  DxPopupModule,
} from 'devextreme-angular';
import { ProductQuantityComponent } from './product-quantity.component';
import { ProductQuantityService } from './product-quantity.service';

@NgModule({
  declarations: [ProductQuantityComponent],
  exports: [ProductQuantityComponent],
  imports: [CommonModule, DxPopupModule, DxNumberBoxModule, DxButtonModule],
  providers: [ProductQuantityService],
})
export class ProductQuantityModule {}
