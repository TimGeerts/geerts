import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  defaults = {
    errorTitle: 'Er ging iets mis...',
    loadingMessage: 'bezig met laden...',
  };

  activeLoadingToast!: ActiveToast<void>;

  constructor(private toastr: ToastrService) {}
  defaultErrorMessage = 'Something went wrong...';

  success(message: string): void {
    this.toastr.success(message);
    console.log(message);
  }
  error(message: string, title: string = ''): void {
    this.toastr.error(message, title || this.defaults.errorTitle, {
      positionClass: 'toast-top-right',
      disableTimeOut: true,
    });
    console.error(message || this.defaultErrorMessage);
  }
  warning(message: string): void {
    this.toastr.warning(message);
    console.warn(message);
  }
  info(message: string): void {
    this.toastr.info(message);
    console.log(message);
  }

  showLoading(message: string = ''): boolean {
    const template = `
      <div>
        <i class='fas fa-circle-notch fa-spin'></i>
        <span>${message || this.defaults.loadingMessage}</span>
      </div>
    `;
    this.activeLoadingToast = this.toastr.show(template, '', {
      toastClass: 'ngx-toastr toast-loading',
      disableTimeOut: true,
    });
    return true;
  }

  hideLoading(): boolean {
    if (this.activeLoadingToast)
      this.toastr.remove(this.activeLoadingToast.toastId);
    return false;
  }

  handleApiError(res: HttpErrorResponse): void {
    try {
      const error = JSON.parse(res.error);
      this.showErrorMessageForCode(error.code, error.message);
    } catch (e) {
      this.error(res.message);
    }
  }

  private showErrorMessageForCode(
    code: string,
    whenCodeNotFound: string = ''
  ): void {
    switch (code) {
      case 'auth/invalid-emaild':
        this.error('Ongeldig emailadres');
        break;
      case 'auth/invalid-passwordd':
        this.error('Ongeldig paswoord');
        break;
      case 'auth/user-not-found':
        this.error('Gebruiker niet gevonden');
        break;
      default:
        this.error(whenCodeNotFound || this.defaultErrorMessage);
    }
  }
}
