import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, AppUser } from '@geerts/shared';

@Component({
  selector: 'geerts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  form = this.fb.group({
    username: ['tim.geerts1@gmail.com', Validators.required],
    password: ['Linneke1', Validators.required],
  });

  login(): void {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.authService.signIn(username, password).subscribe({
      next: (r) => {
        console.log(r);
        this.form.reset();
      },
      error: (e: FirebaseError) => {
        // TODO handle errorcodes
        console.log(e.code);
      },
    });
  }

  updateUserProfile(): void {
    const userData: AppUser = {
      uid: 'qpS2WI9bndgz5A40Ol28k3pextp2',
      displayName: 'Tim',
      role: 'admin',
    };
    this.authService.updateUser(userData).subscribe(() => {
      console.log('user updated');
    });
  }
}
