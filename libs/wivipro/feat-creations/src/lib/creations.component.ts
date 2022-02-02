import { Component, OnInit } from '@angular/core';
import { IGalleryImage } from '@geerts/shared';

@Component({
  selector: 'geerts-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.scss'],
})
export class CreationsComponent implements OnInit {
  gallery: IGalleryImage[] = new Array<IGalleryImage>();

  ngOnInit(): void {
    this.initGallery();
  }

  private initGallery(): void {
    for (let i = 0; i < 100; i++) {
      this.gallery.push(
        {
          fileName: '1.jpg',
        },
        {
          fileName: '2.jpg',
        }
      );
    }
  }
}
