import { Component, Input } from '@angular/core';
import { IMenuItem } from '../types/menu-item';

@Component({
  selector: 'geerts-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() class = '';
  @Input() menuItems: IMenuItem[] = new Array<IMenuItem>();

  showMenu = false;
}
