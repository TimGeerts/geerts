import { Component, Input } from '@angular/core';

@Component({
  selector: 'geerts-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent<T = unknown> {
  @Input() toggle: T | boolean | number | string | null | undefined = undefined;
  @Input() type: 'line' | 'circle' | '' = 'line';
  @Input() count = 3;
}
