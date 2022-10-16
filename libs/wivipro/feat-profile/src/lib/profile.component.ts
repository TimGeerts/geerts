import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  fsUser,
  AuthService,
  NotificationService,
  UserFunctions,
  UpdateUserRequest,
} from '@geerts/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'geerts-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnDestroy {
  $userSub: Subscription;
  usr!: fsUser;
  loading = false;
  sameShipping = true;
  initialFormValues!: string[];
  form = this.fb.group({
    email: [{ value: '', disabled: true }],
    displayName: ['', Validators.required],
    contactName: ['', Validators.required],
    customerNumber: [{ value: '', disabled: true }],
    taxNumber: ['', Validators.required],
    phoneNumber: ['', Validators.required],
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
    private authenticationService: AuthService,
    private userFunctions: UserFunctions,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.$userSub = this.authenticationService.$loggedIn.subscribe(() => {
      const curUser = this.authenticationService.currentUser;
      if (curUser?.uid) {
        this.getUser(curUser.uid);
      }
    });
  }

  ngOnDestroy(): void {
    this.$userSub && this.$userSub.unsubscribe();
  }

  getUser(uid: string): void {
    this.notificationService.showLoading();
    this.userFunctions.getUser({ uid }).subscribe((user) => {
      this.usr = user;
      this.initForm();
      this.notificationService.hideLoading();
    });
  }

  update(): void {
    if (this.formHasChanged(this.initialFormValues, this.toArray(this.form))) {
      this.loading = this.notificationService.showLoading();
      const req: UpdateUserRequest = {
        ...this.formToUser(),
      };
      this.userFunctions.updateUser(req).subscribe({
        next: (r) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.success('Gebruiker aangepast');
        },
        error: (e) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.handleCallableFunctionError(e);
        },
      });
    }
  }

  //handle "sameShipping" checkbox change
  sameShippingChanged(): void {
    this.sameShipping = !this.sameShipping;
    this.toggleShippingValidators();
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
    // add sameShipping value so we can check if that changed too
    arr.push(`${this.sameShipping}`);
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
