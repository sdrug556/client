import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { confirm } from 'devextreme/ui/dialog';
import { ItemClickEvent } from 'devextreme/ui/drop_down_button';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent implements OnInit {
  @Input() name: any = 'User one';

  @Input() image: any = 'assets/img/avatar.svg';

  items: { title: string; icon: string }[] = [
    // {
    //   title: 'Profile',
    //   icon: 'mdi mdi-account',
    // },
    {
      title: 'Logout',
      icon: 'mdi mdi-logout',
    },
  ];

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  async onItemClick(e: ItemClickEvent): Promise<void> {
    switch (e.itemData.title) {
      case 'Profile':
        this._router.navigateByUrl('/admin/profile');
        break;
      case 'Logout':
        const result = await confirm(
          'Are you sure you want to Logout?',
          'Logout'
        );
        if (result) {
          this._authService.logout();
        }
        break;
    }
  }
}
