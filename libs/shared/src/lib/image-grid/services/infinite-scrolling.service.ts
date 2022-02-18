import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfiniteScrolling {
  private intersectionSubject = new BehaviorSubject<boolean>(false);
  public intersectionOptions = {
    root: null, //implies the root is the document viewport
    rootMargin: '0px',
    threshold: [0, 0.5, 1],
  };
  private observer: IntersectionObserver = new IntersectionObserver(
    this.intersectionCallback.bind(this),
    this.intersectionOptions
  );
  getObservable() {
    return this.intersectionSubject.asObservable();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intersectionCallback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry) => {
      entry.intersectionRatio === 1
        ? this.intersectionSubject.next(true)
        : this.intersectionSubject.next(false);
    });
  }
  setObserver() {
    return this.observer;
  }
}
