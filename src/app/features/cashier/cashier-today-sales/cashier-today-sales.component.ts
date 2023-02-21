import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesToday } from '@types';
import { SalesService } from '@services/sales.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-cashier-today-sales',
  templateUrl: './cashier-today-sales.component.html',
  styleUrls: ['./cashier-today-sales.component.scss'],
})
export class CashierTodaySalesComponent implements OnInit {

  @ViewChild(DxFormComponent) dxForm: DxFormComponent;

  visible = false;

  cancelOrderPopupVisible = false;

  formData: any;

  exportFilename = `Sales report: ${new Date().toString()}`;

  submitButtonOptions = {
    text: 'Submit',
    onClick: (e) => {
      const validationResult = this.dxForm.instance.validate();
      if (!validationResult.isValid) {
        return;
      }
      this.salesService.cancelSale(this.dxForm.formData)
        .pipe(
          catchError((err) => {
            notify('Incorrect Admin Username/Password', 'error', 3000);
            return throwError(err);
          })
        )
        .subscribe((isCancelled) => {
          if (isCancelled) {
            this.cancelOrderPopupVisible = false;
            notify('successfully voided the order.','success', 3000);
            this._load();
          }
        });
    }
  }

  addToInventoryOptions = {
    dataSource: [{
      text: 'Yes',
      value: true
    }, {
      text: 'No',
      value: false
    }],
    displayExpr: 'text',
    valueExpr: 'value'
  }

  // @ts-ignore-next
  salesToday: SalesToday[];

  saveButton = {
    text: 'Save',
    icon: 'mdi mdi-content-save',
    onClick: () => {
      console.log(this);
    }
  }

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  onShown(): void {
    this._load();
  }

  private _load(): void { 
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    this.salesService.today()
    .pipe(
      map((sales) => sales.map(sale => {
          sale.total = formatter.format(this._caculateProductTotal(
            sale.price,
            sale.quantity,
            sale.discount
          ));
          sale.price = formatter.format(sale.price);
          return sale;
      }))
    )
    .subscribe(salesToday => {
      this.salesToday = salesToday;
    });
  }

  private _caculateProductTotal(
    price: number,
    qty: number,
    discount: number
  ): number {
    if (!discount) {
      return price * qty;
    }
    const discountPercentage = discount / 100;
    return price * qty - discountPercentage * price;
  }

  cancelOrder = (e: any) => {
    console.log(e);
    this.formData = e.row.data;
    this.formData.addToInventory = true;
    this.formData.cancelQty = null;
    this.cancelOrderPopupVisible = true;
  }


}
