import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '@geerts/shared';

@Component({
  selector: 'wivipro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wivipro';
  menuItems: IMenuItem[] = new Array<IMenuItem>();
  showMobileMenu = false;

  ngOnInit(): void {
    this.initMenu();
  }

  private initMenu(): void {
    this.menuItems = [
      {
        label: 'Over ons',
        routerLink: '/about',
      },
      {
        label: 'Creaties',
        routerLink: '/creations',
      },
      {
        label: 'Webshop',
        extLink: 'http://www.wivipro-webshop.be',
      },
      {
        label: 'Groothandel',
        routerLink: '/wholesale',
      },
    ];
  }
}
