import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  items: string[] = [];

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._router
        .events
        .pipe(filter(res => (res instanceof NavigationEnd)))
        .subscribe(_ => this._generateItems());
    this._generateItems();
  }

  private _generateItems(): void {
    const breadcrumbs: string[] = [];
    const generateBreadBrumbs = (ar: ActivatedRoute, items: string[]) => {
      if (!ar.children.length) return items;
      ar.children.forEach(child => {
        if (child.snapshot.component) {
          items.push(child.snapshot.data['breadcrumbs']);
        }
        generateBreadBrumbs(child, items);
      });
      return items;
    }
    generateBreadBrumbs(this._activatedRoute.root, breadcrumbs);
    this.items = breadcrumbs;
  }

}
