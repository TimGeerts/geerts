import { Component, Input } from '@angular/core';
import { IGalleryImage } from '../shared.module';

@Component({
  selector: 'geerts-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  @Input() class = '';
  @Input() path = 'assets/';
  @Input() images: IGalleryImage[] = new Array<IGalleryImage>();
  @Input() manage = false;
}
