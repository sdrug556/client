import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCardModule } from 'src/app/components/dashboard-card/dashboard-card.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardCardModule,
    QuillModule,
    FormsModule,
    DxButtonModule,
  ]
})
export class DashboardModule { }
