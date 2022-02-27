import { Component } from '@angular/core';
import { IGalleryImage } from '@geerts/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'geerts-delete-image-modal',
  templateUrl: './delete-image.modal.html',
})
export class DeleteImageModalComponent {
  img!: IGalleryImage;

  constructor(public activeModal: NgbActiveModal) {}

  ok(): void {
    this.activeModal.close(true);
  }
}
