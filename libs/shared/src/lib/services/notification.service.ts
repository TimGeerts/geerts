import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  defaults = {
    successTitle: 'Succes!',
    warningTitle: 'Opgepast!',
    infoTitle: 'Ter informatie',
    errorTitle: 'Er ging iets mis...',
  };

  constructor(private toastr: ToastrService) {}
  defaultErrorMessage = 'Something went wrong...';

  success(message: string, title: string = ''): void {
    this.toastr.success(message, title || this.defaults.successTitle);
    console.log(message);
  }
  error(message: string, title: string = ''): void {
    this.toastr.error(message, title || this.defaults.errorTitle, {
      disableTimeOut: true,
    });
    console.error(message || this.defaultErrorMessage);
  }
  warning(message: string, title: string = ''): void {
    this.toastr.warning(message, title || this.defaults.warningTitle, {
      disableTimeOut: true,
    });
    console.warn(message);
  }
  info(message: string, title: string = ''): void {
    this.toastr.info(message, title || this.defaults.infoTitle, {
      disableTimeOut: true,
    });
    console.log(message);
  }

  handleApiError(res: HttpErrorResponse): void {
    console.log(res);
    const errMsg =
      res.error?.message ||
      res.message ||
      res.statusText ||
      this.defaultErrorMessage;
    this.error(errMsg);
  }

  // specific to firebase
  handleFireBaseFunctionError(res: HttpErrorResponse): void {
    const code = res.error?.code;
    switch (code) {
      case 'auth/invalid-email':
        this.error('Ongeldig emailadres');
        break;
      case 'auth/user-not-found':
        this.error('Gebruiker niet gevonden');
        break;
      default:
        console.error(
          res.message || res.statusText || this.defaultErrorMessage
        );
    }
  }
}
