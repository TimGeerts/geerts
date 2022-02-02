import { Component, Input } from '@angular/core';
import { IMenuItem } from '../types/menu-item';

@Component({
  selector: 'geerts-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
})
export class HorizontalMenuComponent {
  @Input() class = '';
  @Input() menuItems: IMenuItem[] = new Array<IMenuItem>();
}
