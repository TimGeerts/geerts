import { Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

export class ModalResult<T> {
  Success: boolean;
  Data: T;

  constructor(data: T, success: boolean = true) {
    this.Success = success;
    this.Data = data;
  }
}

@Injectable()
export class ModalService {
  constructor(private ngbModalService: NgbModal) {}

  //TODO: add some generic dialogs that are used quite often (like a simple yes/no confirmation dialog, etc...)

  show<T, R>(
    content: Type<T>,
    config?: Partial<T>,
    options?: NgbModalOptions
  ): Observable<ModalResult<R>> {
    options = options || {};
    options.windowClass = options.windowClass || '';
    const modal = this.ngbModalService.open(content, options || {});
    Object.assign(modal.componentInstance, config);

    return from(modal.result).pipe(
      take(1),
      map((r) => new ModalResult<R>(r)),
      catchError((e) => of(new ModalResult<R>(e, false)))
    );
  }
}
