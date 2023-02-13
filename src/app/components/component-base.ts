import { Subscription, Observable } from "rxjs";

export abstract class ComponentBase {
  private _subscription = new Subscription();

  subscribe<T>(obs: Observable<T>, cb: (e: T) => void) {
    this._subscription.add(obs.subscribe((e) => cb(e)));
  }

  dispose(): void {
    this._subscription.unsubscribe();
  }

}
