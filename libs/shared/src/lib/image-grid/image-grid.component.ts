import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { IGalleryImage, ModalService } from '../shared.module';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { InfiniteScrolling } from './services/infinite-scrolling.service';

@Component({
  selector: 'geerts-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent implements OnInit, OnDestroy {
  @Input() class = '';
  @Input() path = 'assets/';
  @Input() images: IGalleryImage[] = new Array<IGalleryImage>();
  @Input() manage = false;

  @Output() addImage: EventEmitter<void> = new EventEmitter<void>();
  @Output() editImage: EventEmitter<IGalleryImage> =
    new EventEmitter<IGalleryImage>();
  @Output() deleteImage: EventEmitter<IGalleryImage> =
    new EventEmitter<IGalleryImage>();

  private readonly unsubscribe$: Subject<void> = new Subject();
  imgData: IGalleryImage[] = new Array<IGalleryImage>();
  startLimit = 0;
  endLimit = 10;
  modalOptions: NgbModalOptions = {
    size: 'lg',
    modalDialogClass: 'image-viewer',
  };

  constructor(
    private scrollService: InfiniteScrolling,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getImages(this.startLimit, this.endLimit);
    this.scrollService
      .getObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((s) => {
        if (s) {
          this.startLimit = this.startLimit + 10;
          this.endLimit = this.endLimit + 10;
          this.getImages(this.startLimit, this.endLimit);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getImages(start: number, end: number) {
    this.mockImgService(start, end)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (r) => {
          this.imgData = this.imgData.concat(r);
          const clear = setInterval(() => {
            const target = document.querySelector(`#gimg${end}`);
            if (target) {
              clearInterval(clear);
              this.scrollService.setObserver().observe(target);
            }
          }, 100);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  mockImgService(start: number, end: number): Observable<IGalleryImage[]> {
    return of(this.images.slice(start, end));
  }

  add(): void {
    this.addImage.emit();
  }

  edit(img: IGalleryImage): void {
    this.editImage.emit(img);
  }

  delete(img: IGalleryImage): void {
    this.deleteImage.emit(img);
  }

  show(index: number): void {
    console.log(index);

    const config = {
      images: this.imgData,
      index,
    };

    this.modalService.show<ImageViewerComponent, boolean>(
      ImageViewerComponent,
      config,
      this.modalOptions
    );
  }
}
