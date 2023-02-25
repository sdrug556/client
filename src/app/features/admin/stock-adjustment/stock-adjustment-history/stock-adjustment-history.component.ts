import { Component } from '@angular/core';
import { AdjustmentStockService } from '@services/adjustmentstock.service';
import { AdjustmentStock } from '@types';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-stock-adjustment-history',
  templateUrl: './stock-adjustment-history.component.html',
  styleUrls: ['./stock-adjustment-history.component.scss'],
})
export class StockAdjustmentHistoryComponent {
  adjustments: AdjustmentStock[];

  constructor(private _adjustmentService: AdjustmentStockService) {}

  load(): void {
    this._adjustmentService
      .getAll()
      .pipe(
        take(1),
        map((res) => {
          return res.map((x) => {
            x.createdDate = new Date(+x.createdDate);
            return x;
          });
        })
      )
      .subscribe((adjustments) => {
        this.adjustments = adjustments;
      });
  }
}
