import { Component, OnInit } from '@angular/core';
import { LoginHistoryService } from '@services/login-history.service';
import { LoginHistory } from '@types';
import { first } from 'rxjs';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss'],
  host: { class: 'default-app-style' },
})
export class LoginHistoryComponent implements OnInit {

  history: LoginHistory[];

  constructor(private _loginHistoryService: LoginHistoryService) { }

  ngOnInit(): void {
    this._loginHistoryService
      .getAll()
      .pipe(first())
      .subscribe(histories => {
        this.history = histories;
      });
  }

}
