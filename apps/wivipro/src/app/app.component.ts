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
    this.authFunctions
      .resetPassword({
        uid: 'aUr2i49TXadE6xTFekARTx0GZm52',
        password: 'django0000',
      })
      .subscribe({
        next: (r) => console.log(r),
        error: (error) => this.handleCallableFunctionError(error),
      });
  }

  clickTestError(): void {
    console.log('test function to see error response from callable function');
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

  private handleCallableFunctionError(error: any): void {
    if (error.code) console.error(error.code);
    if (error.message) console.error(error.message);
    if (error.details) console.error(error.details);
  }
}
