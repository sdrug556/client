import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DxButtonModule, DxFormModule, DxTextAreaModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DxFormModule,
    DxTextAreaModule,
    DxButtonModule
  ]
})
export class ProfileModule { }
