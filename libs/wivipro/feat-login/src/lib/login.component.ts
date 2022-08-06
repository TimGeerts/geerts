import { Component, NgZone } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@geerts/shared';

@Component({
  selector: 'geerts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {}

  form = this.fb.group({
    username: ['fake@fake.fake', Validators.required],
    password: ['xxx', Validators.required],
    remember: [true],
  });

  onSubmit(): void {
    console.log(this.form);
  }

  login(): void {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    const remember = this.form.get('remember')?.value;

    try {
      this.authService
        .signIn(username, password)
        .then((result) => {
          console.log(result);
          this.ngZone.run(() => {
            // this.router.navigate(['dashboard']);
          });
        })
        .catch((error) => {
          console.error('test', error.code);
        });
    } catch (error) {
      console.log('all good');
    }
  }
}
