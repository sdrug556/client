import { PhpCurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new PhpCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
