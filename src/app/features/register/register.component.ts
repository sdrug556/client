import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  passwordInput: any;

  userType = UserService.userType;

  loadingVisible = false;

  passwordEditorOptions = {
    onContentReady: (e: any) => (this.passwordInput = e.component),
    mode: 'password',
  };

  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {}

  login(): void {
    this._router.navigateByUrl('login');
  }

  passwordContentReady(e: any): void {
    this.passwordInput = e.component;
    console.log(this.passwordInput);
  }

  passwordComparison = () => {
    console.log(this.passwordInput?.option('value'));
    return this.passwordInput?.option('value');
  };

  async submit(form: DxFormComponent): Promise<void> {
    // const result = form.instance.validate();
    // if (!result.isValid) return;
    // this.loadingVisible = true;
    // const formData = form.formData;
    // const registerResult = await this._userService.register(formData);
    // console.log(registerResult);
    // this.loadingVisible = false;
  }
}
