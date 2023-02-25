import { Injectable } from '@angular/core';
import onScan from 'onscan.js';
import { last, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  attachElements = new Map<string, HTMLElement | Document>();

  constructor() { }

  initialize(id: string, element: HTMLElement | Document): Observable<{ code: any, qty: any }> {
    return new Observable((obs) => {
      onScan.attachTo(element, {
        reactToKeyDown: false,
        reactToPaste: false,
        onScan: (code, qty) => {
          obs.next({ code, qty });
        },
        onScanError: (err) => {
          console.log(err);
        }
      });
      this.attachElements.set(id, element);
    });
  }

  detach(id: string): void {
    const attachElement = this.attachElements.get(id);
    if (attachElement) {
      onScan.detachFrom(attachElement);
    }
  }

  simulate(id: string, code: string): void {
    const attachElement = this.attachElements.get(id);
    if (attachElement) {
      onScan.simulate(attachElement, code);
    }
  }

}
