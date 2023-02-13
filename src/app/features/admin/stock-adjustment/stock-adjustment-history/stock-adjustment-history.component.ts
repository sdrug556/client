import { Component, OnInit } from '@angular/core';
import { AdjustmentStockService } from '@services/adjustmentstock.service';
import { AdjustmentStock } from '@types';
import { map } from 'rxjs/operators';
import { numberToDate } from 'src/app/utils';

@Component({
  selector: 'app-stock-adjustment-history',
  templateUrl: './stock-adjustment-history.component.html',
  styleUrls: ['./stock-adjustment-history.component.scss']
})
export class StockAdjustmentHistoryComponent implements OnInit {

  adjustments: AdjustmentStock[];

  constructor(private _adjustmentService: AdjustmentStockService) { }

  ngOnInit(): void {
    this._adjustmentService.getAll()
      .pipe(
        map((res) => {
          return res.map((x) => {
            x.createdDate = numberToDate(+x.createdDate);
            return x;
          })
        })
      )
      .subscribe(adjustments => {
        this.adjustments = adjustments;
      });
  }

}
