import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SettingNoteType } from '@services/settings.service';
import { DxTreeViewComponent } from 'devextreme-angular';
import { ContentReadyEvent, ItemClickEvent } from 'devextreme/ui/list';
import { filter } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { NotesViewerService } from 'src/app/components/notes-viewer/notes-viewer.service';
import { routeAnimations } from './admin.animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routeAnimations],
})
export class AdminComponent
  extends ComponentBase
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(DxTreeViewComponent) dxTreeview?: DxTreeViewComponent;

  name?: any = null;
  image?: any = null;

  menuItems = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'mdi mdi-view-dashboard',
    },
    {
      title: 'Products',
      url: 'products',
      icon: 'mdi mdi-package-variant',
    },
    // {
    //   title: 'Categories',
    //   url: 'categories',
    //   icon: 'mdi mdi-shape',
    // },
    {
      title: 'Supplier Information',
      url: 'supplier',
      icon: 'mdi mdi-truck',
    },
    {
      title: 'Stock Adjustment',
      url: 'stock-adjustment',
      icon: 'mdi mdi-plus-minus',
    },
    {
      title: 'User',
      url: 'users',
      icon: 'mdi mdi-account-group',
      menu: [
        {
          title: 'User Manager',
          url: 'users/manager',
          icon: 'mdi mdi-account-group',
        },
        {
          title: 'Login History',
          url: 'users/login-history',
          icon: 'mdi mdi-history',
        },
      ],
    },
    {
      title: 'Reports',
      icon: 'mdi mdi-chart-line',
      menu: [
        {
          title: 'Revenue',
          url: 'reports/sales',
          icon: 'mdi mdi-chart-bar',
        },
        {
          title: 'Products Report',
          url: 'reports/products',
          icon: 'mdi mdi-package-variant',
        },
        {
          title: 'Transaction Report',
          url: 'reports/transactions',
          icon: 'mdi mdi-cash-multiple',
          visible: this._authService.userInfo.isOwner
        },
        {
          title: 'Closing Cash Count Report',
          url: 'reports/closing-cash',
          icon: 'mdi mdi-cash',
        },
        {
          title: 'Notes',
          url: 'reports/note',
          icon: 'mdi mdi-note',
        },
      ],
    },
    // {
    //   title: 'Settings',
    //   icon: 'mdi mdi-wrench',
    //   menu: [
    //     {
    //       title: 'Notes',
    //       url: 'settings/notes',
    //       icon: 'mdi mdi-note-text-outline',
    //     },
    //   ],
    // },
  ];

  onItemClick(e: ItemClickEvent): void {
    if (e.itemData.menu?.length || !e.itemData.url) {
      return;
    }
    this._router.navigate([e.itemData.url], {
      relativeTo: this._activatedRoute,
    });
  }

  onContentReady(e: ContentReadyEvent): void {}

  ngOnInit(): void {
    super.subscribe(
      this._router.events.pipe(filter((a) => a instanceof NavigationEnd)),
      (_) => {
        // this.dxTreeview.instance?.collapseAll();
        this._highlightActiveMenuItem();
      }
    );

    const userInfo = this._authService.userInfo;
    this.name = `${userInfo?.lastName} ${userInfo?.firstName}`;
    this.image = null;

    const showNote = Boolean(
      this._activatedRoute.snapshot.queryParams['showNote']
    );
    if (showNote) {
      // this._noteViewerService.show(SettingNoteType.Admin);
      this._router.navigate(['.'], {
        queryParams: { showNote: null },
        relativeTo: this._activatedRoute,
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._highlightActiveMenuItem());
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  private _highlightActiveMenuItem(): void {
    const activeItem = this._getCurrentRouteUrl();
    this.dxTreeview?.instance.selectItem(activeItem);
    this.dxTreeview?.instance.expandItem(activeItem);
  }

  private _getCurrentRouteUrl(): any {
    const findActiveRoute = (menu: any[]) => {
      let activeItem: any = null;
      for (let i = 0, len = menu.length; i < len; i++) {
        if (activeItem) {
          break;
        }
        const item = menu[i];
        if (this._router.url === `/admin/${item.url}`) {
          // if (this._router.url?.endsWith(item.url)) {
          activeItem = item;
        } else if (item.menu) {
          activeItem = findActiveRoute(item.menu);
        }
      }
      return activeItem;
    };
    return findActiveRoute(this.menuItems);
  }

  prepareRoute(): boolean {
    return false;
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _noteViewerService: NotesViewerService,
  ) {
    super();
  }
}
