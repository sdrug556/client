import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SupplierService } from '@services/supplier.service';
import { Supplier } from '@types';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Properties as dxButtonOptions } from 'devextreme/ui/button';
import { DataChange, SavingEvent } from 'devextreme/ui/data_grid';
import notify from 'devextreme/ui/notify';
import { finalize, first, take, map } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { handleOnSaving } from 'src/app/utils';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  host: { class: 'default-app-style' },
})
export class SupplierComponent
  extends ComponentBase
  implements OnInit, OnDestroy
{
  @ViewChild('title') title: DxTextBoxComponent;

  emailContent: any = '';

  isSendingEmail = false;

  emailButtonOptions: dxButtonOptions = {
    icon: 'email',
    stylingMode: 'text',
    onClick: () => {
      if (this.isSendingEmail) {
        return;
      }
      this.isSendingEmail = true;
      this._cdr.detectChanges();
      this._supplierService
        .sendEmail({
          body: this.emailContent,
          email: '',
          subject: this.title.value,
          to: this.sendSupplier.email,
        })
        .pipe(
          take(1),
          finalize(() => {
            this.isSendingEmail = false;
            this.sendSupplier = null;
            notify('Email successfully sent.', 'success', 3000);
          })
        )
        .subscribe();
    },
  };

  supplier: Supplier[];
  sendSupplier: any;

  constructor(
    private _supplierService: SupplierService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this._getAll();
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  private _getAll(): void {
    this._supplierService
      .getAll()
      .pipe(
        first(),
        map((suppliers) =>
          suppliers?.map((s) => {
            s.isDeleted = !s.isDeleted;
            return s;
          })
        )
      )
      .subscribe((res) => {
        this.supplier = res as Supplier[];
      });
  }

  onSaving(e: SavingEvent): void {
    e.changes = e.changes.map((change: DataChange<Object, number | string>) => {
      const supplier = this.supplier.find((s) => s.id === change.key);
      // @ts-ignore-next
      if (supplier && !change.data.hasOwnProperty('isDeleted')) {
        // @ts-ignore-next
        change.data.isDeleted = !supplier.isDeleted;
      } else {
        // @ts-ignore-next
        change.data.isDeleted = !change.data.isDeleted;
      }
      return change;
    });
    console.log(e);
    handleOnSaving(this._supplierService, e, () => this._getAll());
  }

  onEmailClick = (e) => {
    this.sendSupplier = e.row.data;
  };
}
