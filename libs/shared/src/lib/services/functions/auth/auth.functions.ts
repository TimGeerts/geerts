import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallableFunctionService } from '../fb.functions';
import { ResetPasswordRequest, UpdateAuthenticationResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthFunctions {
  constructor(private callFn: CallableFunctionService) {}

  resetPassword(
    req: ResetPasswordRequest
  ): Observable<UpdateAuthenticationResponse> {
    return this.callFn.call<ResetPasswordRequest, UpdateAuthenticationResponse>(
      'resetPassword',
      req
    );
  }
}
