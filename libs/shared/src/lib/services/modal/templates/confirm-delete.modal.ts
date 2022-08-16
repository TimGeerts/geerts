import { Component, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'geerts-confirm-delete-modal',
  templateUrl: './confirm-delete.modal.html',
})
export class ConfirmDeleteModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  body!: TemplateRef<Element>;
  bodyText!: string;

  ok(): void {
    this.activeModal.close(true);
  }
}
