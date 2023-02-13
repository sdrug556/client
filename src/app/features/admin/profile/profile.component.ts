import { Component, OnInit } from '@angular/core';
import { Properties as dxButtonOptions } from 'devextreme/ui/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: { class: 'default-app-style' }
})
export class ProfileComponent implements OnInit {

  saveButtonOptions: dxButtonOptions = {
    text: 'Save',
    icon: 'mdi mdi-content-save'
  };

  refreshButtonOptions: dxButtonOptions = {
    text: 'Refresh',
    icon: 'mdi mdi-refresh'
  };

  ngOnInit(): void {
  }

  constructor() { }

}
