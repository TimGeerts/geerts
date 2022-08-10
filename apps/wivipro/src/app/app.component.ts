import { Component, OnInit } from '@angular/core';
import { AuthService, IMenuItem } from '@geerts/shared';

@Component({
  selector: 'wivipro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Wivipro';
  menuItems: IMenuItem[] = new Array<IMenuItem>();
  showMobileMenu = false;

  constructor(public authService: AuthService) {}

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
        label: 'Geschenken',
        routerLink: '/gifts',
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
