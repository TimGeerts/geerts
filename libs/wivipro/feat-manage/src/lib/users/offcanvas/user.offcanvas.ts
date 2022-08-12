import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AppUser,
  AuthApi,
  AuthUser,
  UserApi,
  NotificationService,
} from '@geerts/shared';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { concat, concatMap, Observable, of } from 'rxjs';

@Component({
  selector: 'geerts-user-offcanvas',
  templateUrl: './user.offcanvas.html',
})
export class UserOffCanvasComponent implements OnInit {
  usr!: AppUser;
  title!: string;
  action: 'create' | 'update' = 'create';
  actionLabel: 'Aanmaken' | 'Aanpassen' = 'Aanmaken';

  form = this.fb.group({
    email: ['', Validators.email],
    displayName: ['', Validators.required],
    contactName: ['', Validators.required],
    customerNumber: ['', Validators.required],
    taxNumber: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
  });

  //TODO usr is not "something" yet in constructor, so formbuilding goes to SHIT!
  constructor(
    private activeOffCanvas: NgbActiveOffcanvas,
    private fb: FormBuilder,
    private authApi: AuthApi,
    private userApi: UserApi,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.usr && this.usr.email) {
      this.action = 'update';
      this.actionLabel = 'Aanpassen';
      this.form.get('password')?.disable(); // this disables the validator
    }
    this.usr = this.usr || {
      role: 'member',
    };
    this.initForm();
  }

  private initForm(): void {
    this.form.setValue({
      email: this.usr.email || '',
      displayName: this.usr.displayName || '',
      contactName: this.usr.contactName || '',
      customerNumber: this.usr.customerNumber || '',
      taxNumber: this.usr.taxNumber || '',
      phoneNumber: this.usr.phoneNumber || '',
      password: '',
    });
  }

  // TODO validate form, cause email validator is wrong
  ok(): void {
    let $uid: Observable<string> = new Observable<string>();
    const userFromForm: AppUser = this.formToUser();
    if (this.action === 'create') {
      // if the action is 'create a user'
      // first we need to make an actual authentication record for the user
      const newAuth: AuthUser = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        displayName: this.form.get('displayName')?.value,
      };
      $uid = this.authApi.create(newAuth);
    } else {
      // update existing user
      $uid = of(userFromForm.uid);
    }

    $uid
      .pipe(
        concatMap((uid) => {
          console.log(uid);
          userFromForm.uid = uid;
          return this.userApi.create(userFromForm);
        })
      )
      .subscribe({
        next: (r) => {
          //TODO notification stuff
          this.activeOffCanvas.close(r);
        },
        error: (e) => this.notificationService.handleApiError(e),
      });
  }

  cancel(): void {
    this.activeOffCanvas.dismiss('cancel');
  }

  // helpers
  private formToUser(): AppUser {
    const newUsr = {
      email: this.form.get('email')?.value,
      displayName: this.form.get('displayName')?.value,
      contactName: this.form.get('contactName')?.value,
      customerNumber: this.form.get('customerNumber')?.value,
      taxNumber: this.form.get('taxNumber')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
    };
    const ret: AppUser = { ...this.usr, ...newUsr };
    return ret;
  }
}
