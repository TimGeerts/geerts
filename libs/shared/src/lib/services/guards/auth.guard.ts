import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.auth.onAuthStateChanged((user) => {
        if (!user) {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
