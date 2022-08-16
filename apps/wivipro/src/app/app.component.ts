import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthFunctions,
  AuthService,
  IMenuItem,
  NotificationService,
} from '@geerts/shared';

@Component({
  selector: 'wivipro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Wivipro';
  menuItems: IMenuItem[] = new Array<IMenuItem>();
  showMobileMenu = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private authFunctions: AuthFunctions
  ) {}

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

  clickTest(): void {
    this.authFunctions.test().subscribe((r) => {
      console.log(r);
    });
  }

  clickTestError(): void {
    this.authFunctions.testError().subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e) => {
        // const obj = JSON.parse(JSON.stringify(e));
        // console.log('error: ', e);
        // console.log('error object?: ', obj);

        const code = e.code;
        const message = e.message;
        const details = e.details;
      },
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
