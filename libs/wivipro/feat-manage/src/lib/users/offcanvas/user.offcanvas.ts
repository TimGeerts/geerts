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
import isEqual from 'lodash-es/isEqual';

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
  adminProfile = false;
  title!: string;
  action: 'create' | 'update' = 'create';
  loading = false;
  initialFormValues!: string[];
  sameShipping = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', Validators.required],
    contactName: ['', Validators.required],
    customerNumber: ['', Validators.required], //TODO validator minimum 4 length
    taxNumber: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    // password: ['', Validators.required],
    billingStreet: ['', Validators.required],
    billingNumber: ['', Validators.required],
    billingNumberExtra: [''],
    billingZipCode: ['', Validators.required],
    billingCity: ['', Validators.required],
    billingCountry: ['', Validators.required],
    shippingStreet: [''],
    shippingNumber: [''],
    shippingNumberExtra: [''],
    shippingZipCode: [''],
    shippingCity: [''],
    shippingCountry: [''],
  });

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
      this.form.get('customerNumber')?.disable();
      if (this.usr.customerNumber === '1' || this.usr.customerNumber === '2') {
        this.adminProfile = true;
        //disable all fields for the admins
        Object.keys(this.form.controls).forEach((key) => {
          this.form.controls[key].disable();
        });
      }
      this.sameShipping = isEqual(
        this.usr.billingAddress,
        this.usr.shippingAddress
      );
      this.toggleShippingValidators();
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
      billingStreet: this.usr.billingAddress?.street || '',
      billingNumber: this.usr.billingAddress?.number || '',
      billingNumberExtra: this.usr.billingAddress?.numberExtra || '',
      billingZipCode: this.usr.billingAddress?.zipcode || '',
      billingCity: this.usr.billingAddress?.city || '',
      billingCountry: this.usr.billingAddress?.country || '',
      shippingStreet: this.usr.shippingAddress?.street || '',
      shippingNumber: this.usr.shippingAddress?.number || '',
      shippingNumberExtra: this.usr.shippingAddress?.numberExtra || '',
      shippingZipCode: this.usr.shippingAddress?.zipcode || '',
      shippingCity: this.usr.shippingAddress?.city || '',
      shippingCountry: this.usr.shippingAddress?.country || '',
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
        password: `wi${this.form.get('customerNumber')?.value}`,
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
    // TODO formHasChanged should also trigger from "sameShipping" checkbox, to compare those fields
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

  //handle "sameShipping" checkbox change
  sameShippingChanged(): void {
    this.sameShipping = !this.sameShipping;
    this.toggleShippingValidators();
  }

  // helpers
  private formToUser(): fsUser {
    const newUsr: Partial<fsUser> = {
      email: this.form.get('email')?.value,
      displayName: this.form.get('displayName')?.value,
      contactName: this.form.get('contactName')?.value,
      customerNumber: this.form.get('customerNumber')?.value,
      taxNumber: this.form.get('taxNumber')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
      billingAddress: {
        street: this.form.get('billingStreet')?.value,
        number: this.form.get('billingNumber')?.value,
        numberExtra: this.form.get('billingNumberExtra')?.value,
        zipcode: this.form.get('billingZipCode')?.value,
        city: this.form.get('billingCity')?.value,
        country: this.form.get('billingCountry')?.value,
      },
    };
    if (!this.sameShipping) {
      newUsr.shippingAddress = {
        street: this.form.get('shippingStreet')?.value,
        number: this.form.get('shippingNumber')?.value,
        numberExtra: this.form.get('shippingNumberExtra')?.value,
        zipcode: this.form.get('shippingZipCode')?.value,
        city: this.form.get('shippingCity')?.value,
        country: this.form.get('shippingCountry')?.value,
      };
    } else {
      newUsr.shippingAddress = newUsr.billingAddress;
    }
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

  private toggleShippingValidators(): void {
    if (this.sameShipping) {
      // disable validators for shipping fields
      this.form.get('shippingStreet')?.removeValidators(Validators.required);
      this.form.get('shippingNumber')?.removeValidators(Validators.required);
      this.form.get('shippingZipCode')?.removeValidators(Validators.required);
      this.form.get('shippingCity')?.removeValidators(Validators.required);
      this.form.get('shippingCountry')?.removeValidators(Validators.required);
    } else {
      // enable validators for shipping fields
      this.form.get('shippingStreet')?.addValidators(Validators.required);
      this.form.get('shippingNumber')?.addValidators(Validators.required);
      this.form.get('shippingZipCode')?.addValidators(Validators.required);
      this.form.get('shippingCity')?.addValidators(Validators.required);
      this.form.get('shippingCountry')?.addValidators(Validators.required);
    }
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.updateValueAndValidity();
    });
  }
}
