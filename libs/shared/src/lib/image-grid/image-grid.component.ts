import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGalleryImage } from '../shared.module';
import { InfiniteScrolling } from './services/infinite-scrolling.service';

@Component({
  selector: 'geerts-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent implements OnInit {
  @Input() class = '';
  @Input() path = 'assets/';
  @Input() images: IGalleryImage[] = new Array<IGalleryImage>();
  @Input() manage = false;

  imgData: IGalleryImage[] = new Array<IGalleryImage>();
  startLimit = 0;
  endLimit = 10;

  constructor(private scrollService: InfiniteScrolling) {}

  ngOnInit(): void {
    this.getImages(this.startLimit, this.endLimit);
    this.scrollService.getObservable().subscribe((s) => {
      if (s) {
        this.startLimit = this.startLimit + 10;
        this.endLimit = this.endLimit + 10;
        this.getImages(this.startLimit, this.endLimit);
      }
    });
  }

  getImages(start: number, end: number) {
    this.mockImgService(start, end).subscribe(
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
    // TODO add CRUD dialog
    console.log(`ADD`);
    this.imgData.unshift({
      fileName: '1.jpg',
    });
  }

  edit(img: IGalleryImage): void {
    // TODO add CRUD dialog
    console.log(`EDIT ${JSON.stringify(img)}`);
  }

  delete(img: IGalleryImage): void {
    // TODO add confirmation dialog
    console.log(`DELETE ${JSON.stringify(img)}`);
  }
}
