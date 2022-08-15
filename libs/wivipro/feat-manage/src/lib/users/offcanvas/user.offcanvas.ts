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
import { concatMap, Observable, of } from 'rxjs';

@Component({
  selector: 'geerts-user-offcanvas',
  templateUrl: './user.offcanvas.html',
})
export class UserOffCanvasComponent implements OnInit {
  usr!: AppUser;
  title!: string;
  action: 'create' | 'update' = 'create';
  actionLabel: 'Aanmaken' | 'Aanpassen' = 'Aanmaken';
  resultMessage: 'Gebruiker aangemaakt' | 'Gebruiker aangepast' =
    'Gebruiker aangemaakt';
  loading = false;

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
      this.resultMessage = 'Gebruiker aangepast';
      this.form.get('password')?.disable(); // this disables the validator
    }
    this.usr = this.usr || {};
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
    this.loading = this.notificationService.showLoading();
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
          userFromForm.uid = uid;
          return this.userApi.create(userFromForm);
        })
      )
      .subscribe({
        next: (r) => {
          this.activeOffCanvas.close(r);
          this.loading = this.notificationService.hideLoading();
          this.notificationService.success(this.resultMessage);
        },
        error: (e) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.handleApiError(e);
        },
      });
  }

  cancel(): void {
    this.activeOffCanvas.dismiss('cancel');
  }

  // TODO confirm delete
  delete(): void {
    this.loading = this.notificationService.showLoading();
    // first delete the user record, if that succeeds, delete the auth record as well
    this.userApi
      .delete(this.usr.uid)
      .pipe(
        concatMap((res) => {
          return this.authApi.delete(this.usr.uid);
        })
      )
      .subscribe({
        next: (r) => {
          this.activeOffCanvas.close(r);
          this.loading = this.notificationService.hideLoading();
          this.notificationService.success('Gebruiker verwijderd');
        },
        error: (e) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.handleApiError(e);
        },
      });
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
