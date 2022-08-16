import { Injectable, TemplateRef, Type } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbOffcanvas,
  NgbOffcanvasOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from './templates/confirm-delete.modal';

//TODO: maybe we also need an OffCanvasResult<T>, time will tell
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
  defaultOffCanvasOptions: NgbOffcanvasOptions = { position: 'end' };

  constructor(
    private ngbModalService: NgbModal,
    private ngbOffCanvasService: NgbOffcanvas
  ) {}

  //TODO: add some generic dialogs that are used quite often (like a simple yes/no confirmation dialog, etc...)

  confirmDelete(message: string = ''): Observable<ModalResult<boolean>> {
    return this.show<ConfirmDeleteModalComponent, boolean>(
      ConfirmDeleteModalComponent,
      { bodyText: message }
    );
  }

  confirmDeleteWithTemplate(
    template: TemplateRef<Element>
  ): Observable<ModalResult<boolean>> {
    return this.show<ConfirmDeleteModalComponent, boolean>(
      ConfirmDeleteModalComponent,
      { body: template }
    );
  }

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

  showOffCanvas<T, R>(
    content: Type<T>,
    config?: Partial<T>,
    options?: NgbOffcanvasOptions
  ): Observable<ModalResult<R>> {
    options = { ...this.defaultOffCanvasOptions, ...(options || {}) };
    const offCanvas = this.ngbOffCanvasService.open(content, options || {});
    Object.assign(offCanvas.componentInstance, config);

    return from(offCanvas.result).pipe(
      take(1),
      map((r) => new ModalResult<R>(r)),
      catchError((e) => of(new ModalResult<R>(e, false)))
    );
  }
}
