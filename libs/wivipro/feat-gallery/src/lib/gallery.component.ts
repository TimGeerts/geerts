import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGalleryImage } from '@geerts/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'geerts-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  gallery: IGalleryImage[] = new Array<IGalleryImage>();
  title = '';
  assetsfolder = '';
  canmanage = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.title = data.title;
      this.assetsfolder = `galleries/${data.folder}/`;
      this.initGallery();
    });
  }

  private initGallery(): void {
    for (let i = 0; i < 100; i++) {
      this.gallery.push(
        {
          fileName: `1.jpg?${i}`,
        },
        {
          fileName: `2.jpg?${i}`,
        }
      );
    }
  }
}
