import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxDataGridModule,
  DxLookupModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { ImageModule } from 'src/app/components/image/image.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    DxDataGridModule,
    DxLookupModule,
    DxLookupModule,
    ImageModule,
    DxTextBoxModule,
  ],
})
export class ProductsModule {}
