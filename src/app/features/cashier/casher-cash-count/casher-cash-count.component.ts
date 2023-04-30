import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { SalesService } from '@services/sales.service';
import notify from 'devextreme/ui/notify';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-casher-cash-count',
  templateUrl: './casher-cash-count.component.html',
  styleUrls: ['./casher-cash-count.component.scss'],
})
export class CasherCashCountComponent implements OnInit, OnDestroy {
  subs = new Subscription();

  visible = false;

  controls: {
    name: string;
    value: number;
    total?: string;
  }[] = [
    {
      name: 'oneThou',
      value: 1000,
    },
    {
      name: 'fiveHundred',
      value: 500,
    },
    {
      name: 'twoHundred',
      value: 200,
    },
    {
      name: 'oneHundred',
      value: 100,
    },
    {
      name: 'fifty',
      value: 50,
    },
    {
      name: 'twenty',
      value: 20
    },
    {
      name: 'ten',
      value: 10,
    },
    {
      name: 'five',
      value: 5,
    },
    {
      name: 'one',
      value: 1,
    },
    {
      name: 'twentyFiveCents',
      value: 0.25,
    },
  ];

  isRendered = false;

  formGroup = new FormGroup({
    openingCash: new FormControl(0),
    closingCash: new FormControl(0)
  });

  shiftNumber = '';
  cashierName = '';
    isSaving: boolean;

  constructor(
    public authService: AuthService,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.shiftNumber = this.authService.userInfo.shiftNumber;
    this.cashierName = `${this.authService.userInfo.firstName} ${this.authService.userInfo.lastName}`;

    this.controls.forEach((control) => {
      control.total = control.name + 'Total';
      this.formGroup.addControl(control.name, new FormControl(0));
      this.formGroup.addControl(control.total, new FormControl(0));

      const sub = this.formGroup
        .get(control.name)
        .valueChanges.subscribe((value) => {
          this.formGroup
            .get(control.total)
            .setValue(value * control.value, { emitEvent: false });
        });
      this.subs.add(sub);
    });

    const sub = this.formGroup.valueChanges.subscribe(res => {
      const total = this.controls.reduce((prev, cur) => {
        const value = this.formGroup.get(cur.name).value * cur.value;
        prev += value;
        return prev;
      }, 0);
      this.formGroup.get('closingCash').setValue(total, { emitEvent: false })
    });
    this.subs.add(sub);

    this.isRendered = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit(e?: Event): void {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    e?.preventDefault();
    const closingSales = this.formGroup.getRawValue();
    closingSales.shiftNumber = this.authService.userInfo.shiftNumber;
    closingSales.userId = this.authService.userInfo.id;
    closingSales.createdDate = Date.now();
    this.salesService.addClosingSale(closingSales)
      .pipe(
        take(1),
        finalize(() => this.isSaving = false)
      )
      .subscribe(() => {
        this.visible = false;
        notify('Successfully Saved Closing Sales Cash Count', 'success', 3000);
      })
  }

  show(): void {
    this.visible = true;
  }
}
