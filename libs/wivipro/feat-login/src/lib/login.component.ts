import { Component, NgZone } from '@angular/core';
import { AuthService } from '@geerts/shared';

@Component({
  selector: 'geerts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private ngZone: NgZone) {}

  login(): void {
    this.authService
      .signIn('tim.geerts1@gmail.com', 'Linneke1')
      .then((result) => {
        this.ngZone.run(() => {
          // this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        console.error('test', error.message);
      });
  }
}
