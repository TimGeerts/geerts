import { Component, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'geerts-confirm-reset-modal',
  templateUrl: './confirm-reset.modal.html',
})
export class ConfirmResetModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  body!: TemplateRef<Element>;
  bodyText!: string;

  ok(): void {
    this.activeModal.close(true);
  }
}
