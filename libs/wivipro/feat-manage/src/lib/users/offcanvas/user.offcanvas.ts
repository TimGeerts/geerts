import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  fsUser,
  NotificationService,
  ModalService,
  AuthFunctions,
  CreateUserRequest,
  UpdateUserRequest,
  UserFunctions,
} from '@geerts/shared';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NEVER, switchMap } from 'rxjs';

@Component({
  selector: 'geerts-user-offcanvas',
  templateUrl: './user.offcanvas.html',
})
export class UserOffCanvasComponent implements OnInit {
  @ViewChild('confirmDeleteUser') confirmDeleteUser!: TemplateRef<Element>;
  @ViewChild('confirmResetPassword')
  confirmResetPassword!: TemplateRef<Element>;

  usr!: fsUser;
  title!: string;
  action: 'create' | 'update' = 'create';
  actionLabel: 'Aanmaken' | 'Aanpassen' = 'Aanmaken';
  resultMessage: 'Gebruiker aangemaakt' | 'Gebruiker aangepast' =
    'Gebruiker aangemaakt';
  loading = false;
  initialFormValues!: string[];

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
    private authFunctions: AuthFunctions,
    private userFunctions: UserFunctions,
    private notificationService: NotificationService,
    private modalService: ModalService
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
    // used to check changes later on
    this.initialFormValues = this.toArray(this.form);
  }

  // TODO validate form, cause email validator is wrong
  add(): void {
    this.loading = this.notificationService.showLoading();
    const req: CreateUserRequest = {
      auth: {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        displayName: this.form.get('displayName')?.value,
      },
      user: {
        ...this.formToUser(),
      },
    };
    this.authFunctions.createUser(req).subscribe({
      next: (r) => {
        console.log('add user ', r);
        this.activeOffCanvas.close(r);
        this.loading = this.notificationService.hideLoading();
        this.notificationService.success('Gebruiker aangemaakt');
      },
      error: (e) => {
        this.loading = this.notificationService.hideLoading();
        this.notificationService.handleCallableFunctionError(e);
      },
    });
  }

  // TODO validate form, cause email validator is wrong
  update(): void {
    if (this.formHasChanged(this.initialFormValues, this.toArray(this.form))) {
      this.loading = this.notificationService.showLoading();
      const req: UpdateUserRequest = {
        ...this.formToUser(),
      };
      this.userFunctions.updateUser(req).subscribe({
        next: (r) => {
          console.log('updated user ', r);
          this.activeOffCanvas.close(r);
          this.loading = this.notificationService.hideLoading();
          this.notificationService.success('Gebruiker aangepast');
        },
        error: (e) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.handleCallableFunctionError(e);
        },
      });
    } else {
      this.cancel();
    }
  }

  cancel(): void {
    this.activeOffCanvas.dismiss('cancel');
  }

  delete(): void {
    const req = {
      uid: this.usr.uid,
    };
    this.modalService
      .confirmDeleteWithTemplate(this.confirmDeleteUser)
      .pipe(
        switchMap((r) => {
          if (r.Success) {
            this.loading = this.notificationService.showLoading();
            return this.authFunctions.deleteUser(req);
          } else {
            return NEVER;
          }
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
          this.notificationService.handleCallableFunctionError(e);
        },
      });
  }

  resetPassword(): void {
    const req = {
      uid: this.usr.uid,
      password: `wi${this.usr.customerNumber}`,
    };
    this.modalService
      .confirmResetWithTemplate(this.confirmResetPassword)
      .pipe(
        switchMap((r) => {
          if (r.Success) {
            this.loading = this.notificationService.showLoading();
            return this.authFunctions.resetPassword(req);
          } else {
            return NEVER;
          }
        })
      )
      .subscribe({
        next: (r) => {
          this.activeOffCanvas.close(r);
          this.loading = this.notificationService.hideLoading();
          this.notificationService.success('Paswoord is gereset');
        },
        error: (e) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.handleCallableFunctionError(e);
        },
      });
  }

  // helpers
  private formToUser(): fsUser {
    const newUsr = {
      email: this.form.get('email')?.value,
      displayName: this.form.get('displayName')?.value,
      contactName: this.form.get('contactName')?.value,
      customerNumber: this.form.get('customerNumber')?.value,
      taxNumber: this.form.get('taxNumber')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
    };
    const ret: fsUser = { ...this.usr, ...newUsr };
    return ret;
  }

  private formHasChanged(
    initialValues: string[],
    newValues: string[]
  ): boolean {
    return initialValues.some((val, idx) => val !== newValues[idx]);
  }

  private toArray(form: FormGroup): string[] {
    const arr = new Array<string>();
    Object.keys(form.controls).forEach((key) => {
      arr.push(form.get(key)?.value);
    });
    return arr;
  }
}
