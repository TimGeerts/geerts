// source: https://codepen.io/3psy0n/pen/LYpajmX

import { Component, Input } from '@angular/core';

@Component({
  selector: 'geerts-horizontal-card',
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.scss'],
})
export class HorizontalCardComponent {
  @Input() class = '';
  @Input() type: 'dark' | 'light' = 'light';
  @Input() cardTitle = '';
  @Input() titleClass = '';
  @Input() img = '';
}
