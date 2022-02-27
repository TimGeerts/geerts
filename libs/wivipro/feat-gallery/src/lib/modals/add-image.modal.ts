import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'geerts-add-image-modal',
  templateUrl: './add-image.modal.html',
})
export class AddImageModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  ok(): void {
    this.activeModal.close(true);
  }
}
