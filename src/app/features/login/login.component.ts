import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { DxFormComponent } from 'devextreme-angular';
import { finalize, of, catchError, first, delay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loadingVisible = false;

  userType = UserService.userType;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  async submit(e: any, form: DxFormComponent): Promise<any> {
    e.event.preventDefault();
    const result = form.instance.validate();
    if (!result.isValid) return;
    this.loadingVisible = true;
    this._authService.login(form.formData.email, form.formData.password)
      .pipe(
        finalize(() => {
          setTimeout(() => this.loadingVisible = false, 1000);
        }),
        delay(1000),
        catchError((err) => {
          return of(err);
        }),
        first()
      )
      .subscribe(user => {
        if (user) {
          switch (+user.type) {
            case 1: // admin
              this._router.navigateByUrl('/admin');
            break;
            case 2: // cashier
              this._router.navigateByUrl('/cashier');
            break;
          }
        }
      });
  }

  register(): void {
    this._router.navigateByUrl('register');
  }
}
