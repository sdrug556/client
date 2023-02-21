import { SavingEvent } from 'devextreme/ui/data_grid';
import notify from 'devextreme/ui/notify';
import { Properties as dxToastOptions } from 'devextreme/ui/toast';
import * as htmlToPdf from 'html2pdf.js';
import { catchError, first, Observable, of } from 'rxjs';

export function currencyFormatter(value: any): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value);
}

export const notifyOptions: dxToastOptions = {
  position: 'bottom right',
  animation: {
    hide: {
      type: 'fadeOut',
      duration: 300,
    },
    show: {
      type: 'fadeIn',
      duration: 300,
    },
  },
};

export function notifySuccess(message: string): void {
  notify({ ...notifyOptions, message }, 'success', 2000);
}

export function tryJsonParse<T>(data: string | null): T | null {
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

export function numberToDate(date: number): Date {
  return new Date(date * 1000);
}

export function dateToNumber(date: Date): number {
  return +date;
}

export function createArrayStore<T>(dataSource: T[], keyExpr = 'id'): any {
  return {
    store: {
      type: 'array',
      key: keyExpr,
      data: dataSource ?? [],
    },
    paginate: true,
  };
}

export function dataDateToUnix(data: any): void {
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Date) {
      data[key] = dateToNumber(data[key]);
    }
  });
  return data;
}

interface IService {
  getAll(): Observable<any>;
  get(id: number): Observable<any>;
  add(item: any): Observable<any>;
  update(id: number, item: any): Observable<any>;
  delete(id: number): Observable<any>;
}
type IHandlerCallback = (e: 'insert' | 'update' | 'remove') => void;
export function handleOnSaving(
  service: IService,
  e: SavingEvent,
  cb: IHandlerCallback
) {
  const change = e.changes[0];
  switch (change.type) {
    case 'insert':
      delete change.data.id;
      e.promise = new Promise((resolve) => {
        service
          .add(dataDateToUnix(change.data))
          .pipe(
            first(),
            catchError((err) => {
              resolve();
              return of(err);
            })
          )
          .subscribe(() => {
            notifySuccess('Successfully added Product');
            resolve();
            cb('insert');
          });
      });
      break;
    case 'update':
      change.data.id = change.key;
      e.promise = new Promise((resolve) => {
        service
          .update(change.key, dataDateToUnix(change.data))
          .pipe(
            first(),
            catchError((err) => {
              resolve();
              return of(err);
            })
          )
          .subscribe((res) => {
            notifySuccess('Successfully updated Product');
            resolve();
            cb('update');
          });
      });
      break;
    case 'remove':
      e.promise = new Promise((resolve) => {
        service
          .delete(change.key)
          .pipe(
            first(),
            catchError((err) => {
              resolve();
              return of(err);
            })
          )
          .subscribe(() => {
            notifySuccess('Successfully deleted');
            resolve();
            cb('remove');
          });
      });
      break;
  }
}

export const calculateVAT = (total: number): number => {
  return total * 0.12;
};

export function printReciept(name: string, element: HTMLElement): any {
  const options = {
    margin: 1,
    filename: name,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  return htmlToPdf().set(options).from(element).save();
}
