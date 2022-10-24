import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IGalleryImage } from '../../shared.module';

@Component({
  selector: 'geerts-image-viewer',
  templateUrl: './image-viewer.component.html',
})
export class ImageViewerComponent implements OnInit {
  images!: IGalleryImage[];
  index = 0;
  max = 0;
  currentImage?: IGalleryImage;

  private _img$ = new Subject<IGalleryImage>();
  readonly img$ = this._img$.asObservable();

  constructor(public activeModal: NgbActiveModal) {
    this.img$.subscribe((img) => {
      this.currentImage = img;
    });
  }

  ngOnInit(): void {
    this.max = this.images?.length ?? 0;
    this.setActiveImage();
  }

  prev(): void {
    this.index = this.index > 0 ? this.index - 1 : this.max - 1;
    this.setActiveImage();
  }

  next(): void {
    this.index = this.index < this.max - 1 ? this.index + 1 : 0;
    this.setActiveImage();
  }

  private setActiveImage(): void {
    this.currentImage = undefined;
    this._img$.next(this.images[this.index]);
  }
}
