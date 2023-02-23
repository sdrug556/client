import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { User } from '@types';
import { EditCanceledEvent, EditingStartEvent, InitNewRowEvent, RowRemovedEvent, RowRemovingEvent, SavingEvent } from 'devextreme/ui/data_grid';
import { ComponentBase } from 'src/app/components/component-base';
import notify from 'devextreme/ui/notify';
import { handleOnSaving } from 'src/app/utils';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss'],
  host: { class: 'default-app-style' },
})
export class UsersManagerComponent extends ComponentBase implements OnInit, OnDestroy {
  users: User[] = [];

  userType = UserService.userType;

  popUpLabel: 'Edit User' | 'Add User' = 'Add User';

  textBox: any;

  currentUserIdEditing = false;

  userCache = this._authService.userInfo;

  constructor(
    private _usersService: UserService,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this._getAll();
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  onInitNewRow(e: InitNewRowEvent): void {
    this.popUpLabel = 'Add User';
  }

  onEditingStart(e: EditingStartEvent): void {
    this.popUpLabel = 'Edit User';
    this.currentUserIdEditing = e.data.id === this.userCache?.id;
  }

  onEditCanceled(e: EditCanceledEvent): void {
    this.currentUserIdEditing = false;
  }

  onRowRemoving(e: RowRemovingEvent): void {
    if (e.data.id === this.userCache?.id) {
      notify('You cannot delete yourself.', 'error', 2000);
      e.cancel = true;
    }
  }

  async onSaving(e: SavingEvent): Promise<void> {
    handleOnSaving(this._usersService, e, () => this._getAll());
  }

  private _getAll(): void {
    this._usersService.getAll()
      .pipe(
        first(),
        map((users: any[]) => users?.map((user) => {
          if (user.birthday) { user.birthday = new Date(+user.birthday); }
          if (user.createdDate) { user.createdDate = new Date(+user.createdDate); }
          return user;
        }))
      )
      .subscribe(users => {
        this.users = users ?? [];
      });
  }

  passwordComparison = () => {
    return this.textBox?.option('value');
  }

  contentReady = (e: any) => {
    this.textBox = e.component;
  }

  log(form) {
    console.log(form);
  }

}
