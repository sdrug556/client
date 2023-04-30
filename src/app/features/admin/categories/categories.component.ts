import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
})
export class CategoriesComponent
  extends ComponentBase
  implements OnInit, OnDestroy
{
  @Output() onChanged = new EventEmitter<any>();

  categories: Category[] = [];

  constructor(private _cs: CategoryService) {
    super();
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
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
    handleOnSaving(this._cs, e, () => {
      this.load();
      this.onChanged.emit(this);
    });
  }
}
