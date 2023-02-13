import { Pipe, PipeTransform } from '@angular/core';
import { currencyFormatter } from '../utils';

@Pipe({
  name: 'phpCurrency',
  pure: true
})
export class PhpCurrencyPipe implements PipeTransform {

  transform(value: any): string {
    value = parseInt(value as string);
    if (Number.isNaN(value)) { value = 0; }
    return currencyFormatter(value);
  }

}
