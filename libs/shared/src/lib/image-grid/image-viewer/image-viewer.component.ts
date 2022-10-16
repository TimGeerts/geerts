import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IGalleryImage } from '../../shared.module';

@Component({
  selector: 'geerts-image-viewer',
  templateUrl: './image-viewer.component.html',
})
export class ImageViewerComponent implements OnInit {
  img!: IGalleryImage;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  prev(): void {
    console.log('previous');
  }

  next(): void {
    console.log('next');
  }
}
