import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared.module';
import { CallableFunctionService } from '../fb.functions';
import {
  CreateUserRequest,
  ResetPasswordRequest,
  UpdateAuthenticationResponse,
  UpdateUserRequest,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthFunctions {
  constructor(private callFn: CallableFunctionService) {}

  createUser(req: CreateUserRequest): Observable<AppUser> {
    return this.callFn.call<CreateUserRequest, AppUser>('createUser', req);
  }

  //TODO should move to user functions, this is not AUTH
  updateUser(req: UpdateUserRequest): Observable<AppUser> {
    return this.callFn.call<UpdateUserRequest, AppUser>('updateUser', req);
  }

  resetPassword(
    req: ResetPasswordRequest
  ): Observable<UpdateAuthenticationResponse> {
    return this.callFn.call<ResetPasswordRequest, UpdateAuthenticationResponse>(
      'resetPassword',
      req
    );
  }
}
