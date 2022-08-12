import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  defaultErrorMessage = 'Something went wrong...';

  success(message: string): void {
    console.log(message);
  }
  error(message: string): void {
    console.error(message || this.defaultErrorMessage);
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
