import { Component, Input } from '@angular/core';
import { IGalleryImage } from '../shared.module';

@Component({
  selector: 'geerts-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent {
  @Input() class = '';
  @Input() path = 'assets/';
  @Input() images: IGalleryImage[] = new Array<IGalleryImage>();
}
