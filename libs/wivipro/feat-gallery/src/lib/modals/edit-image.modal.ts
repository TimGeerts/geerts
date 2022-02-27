import { Component } from '@angular/core';
import { IGalleryImage } from '@geerts/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'geerts-edit-image-modal',
  templateUrl: './edit-image.modal.html',
})
export class EditImageModalComponent {
  img!: IGalleryImage;

  constructor(public activeModal: NgbActiveModal) {}

  ok(): void {
    this.activeModal.close(true);
  }
}
