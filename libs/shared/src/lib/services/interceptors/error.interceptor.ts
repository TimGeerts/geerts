import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, delay, retryWhen } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if (index < maxRetries) {
              // retry the http call, just in case
              return of(error).pipe(delay(delayMs));
            }
            // not fixed even after retries
            // TODO maybe no need to add the error message, but make a generic error message and "store or mail" the actual message?
            this.notificationService.error(`<pre>${error.message}</pre>`);
            throw error;
          })
        );
      })
    );
  }
}
