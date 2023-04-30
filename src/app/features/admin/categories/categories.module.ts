import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  exports: [CategoriesComponent],
  imports: [CommonModule, CategoriesRoutingModule, DxDataGridModule],
})
export class CategoriesModule {}
