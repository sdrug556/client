import { Component, OnInit } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  host: {
    class: 'default-app-style'
  }
})
export class ForgotPasswordComponent implements OnInit {

  loadingVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  // submit(form: DxFormComponent): void {
  //   const validationResult = form.instance.validate();
  //   if (!validationResult.isValid) return;
  //   const formData = form.instance.option('formData');
  //   this.loadingVisible = true;
  //   this._auth.sendPasswordResetEmail(formData.email)
  //     .then((res) => {
  //       notify(`Password reset link is successfully sent to ${formData.email}.`, 'success', 5000);
  //     })
  //     .catch(() => {
  //       notify('There is no user record corresponding to this identifier. The user may have been deleted.', 'error', 5000);
  //     })
  //     .finally(() => this.loadingVisible = false);
  // }

}
