import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { Category } from '@types';
import { SavingEvent } from 'devextreme/ui/data_grid';
import { first, catchError, of } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { handleOnSaving, notifySuccess } from 'src/app/utils';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: { class: 'default-app-style' },
})
export class CategoriesComponent
  extends ComponentBase
  implements OnInit, OnDestroy
{
  categories: Category[] = [];

  constructor(private _cs: CategoryService) {
    super();
  }

  ngOnInit(): void {
    this._getAll();
  }

  private _getAll(): void {
    this._cs
      .getAll()
      .pipe(first())
      .subscribe((res) => {
        this.categories = res as Category[];
      });
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  onSaving(e: SavingEvent): void {
    handleOnSaving(this._cs, e, () => this._getAll());
  }
}
