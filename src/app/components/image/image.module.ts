import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent],
  imports: [
    CommonModule,
    DxButtonModule
  ]
})
export class ImageModule { }
