import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initMenu();
    // this.notificationService.success('success');
    // this.notificationService.warning('warning');
    // this.notificationService.error('error');
    // this.notificationService.info('info');
    // this.notificationService.showLoading();
  }

  login(): void {
    // if currently on the login page, don't pass the returnurl
    if (this.router.url.startsWith('/login')) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
    }
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
