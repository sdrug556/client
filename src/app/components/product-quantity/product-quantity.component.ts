import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DxNumberBoxComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { ProductQuantityService } from './product-quantity.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent implements OnInit {
  @ViewChild(DxNumberBoxComponent) dxNumberbox: DxNumberBoxComponent;

  minValue = 0;

  maxValue = 0;

  visible = false;

  value = 1;

  private _sub: Subscription;

  constructor(
    private _productQuantityService: ProductQuantityService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._sub = this._productQuantityService.options$.subscribe((options) => {
      this.minValue = options.min;
      this.maxValue = options.max;
      this.value = 1;
      this.visible = options.show;
      this._cdr.detectChanges();
    });
  }

  submit(e?: Event): void {
    e?.preventDefault();
    if (this.dxNumberbox.value) {
      this._productQuantityService.submit(this.dxNumberbox.value);
      this.visible = false;
    }
  }

  onHidden(): void {
    console.log('hidden');
    this.visible = false;
    // this._sub.unsubscribe();
  }
}
