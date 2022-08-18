import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@geerts/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'geerts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  returnUrl!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.returnUrl = params?.returnUrl || '/';
    });
  }

  form = this.fb.group({
    username: ['tim.geerts1@gmail.com', Validators.required],
    password: ['Linneke1', Validators.required],
  });

  login(): void {
    const returnUrl = this.returnUrl;
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.authService
      .signIn(username, password)
      .pipe(take(1))
      .subscribe({
        next: (_) => {
          this.form.reset();
          this.router.navigate([returnUrl]);
        },
        error: (e: FirebaseError) => {
          // TODO handle errorcodes
          console.log(e);
        },
      });
  }
}
