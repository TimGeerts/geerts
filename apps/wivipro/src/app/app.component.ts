import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IMenuItem, NotificationService } from '@geerts/shared';

@Component({
  selector: 'wivipro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Wivipro';
  menuItems: IMenuItem[] = new Array<IMenuItem>();
  showMobileMenu = false;
  loginReturnUrl = '/';

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initMenu();

    this.notificationService.success('success');
    this.notificationService.warning('warning');
    this.notificationService.error('error');
    this.notificationService.info('info');
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
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
