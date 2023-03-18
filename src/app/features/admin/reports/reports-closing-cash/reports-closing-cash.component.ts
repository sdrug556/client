import { Component, OnInit } from '@angular/core';
import { SalesService } from '@services/sales.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-reports-closing-cash',
  templateUrl: './reports-closing-cash.component.html',
  styleUrls: ['./reports-closing-cash.component.scss']
})
export class ReportsClosingCashComponent implements OnInit {
  closingsCash: any[];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getClosingSale()
      .pipe(
        take(1),
        map((result) => {
          return result.map((r) => {
            r.name = `${r.firstName} ${r.lastName}`;
            console.log(r.createdDate);
            r.createdDate = new Date(r.createdDate);
            return r;
          })
        })
      )
      .subscribe(res => {
        console.log(res);
        this.closingsCash = res;
      })
  }


  log(e) { console.log(e) }
}
