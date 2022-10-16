import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fsUser } from '../../../shared.module';
import { CallableFunctionService } from '../fb.functions';
import {
  CreateUserRequest,
  DeleteUserRequest,
  ResetPasswordRequest,
  UpdateAuthenticationResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthFunctions {
  constructor(private callFn: CallableFunctionService) {}

  createUser(req: CreateUserRequest): Observable<fsUser> {
    return this.callFn.call<CreateUserRequest, fsUser>('createUser', req);
  }

  resetPassword(
    req: ResetPasswordRequest
  ): Observable<UpdateAuthenticationResponse> {
    return this.callFn.call<ResetPasswordRequest, UpdateAuthenticationResponse>(
      'resetPassword',
      req
    );
  }

  deleteUser(req: DeleteUserRequest): Observable<boolean> {
    return this.callFn.call<DeleteUserRequest, boolean>('deleteUser', req);
  }
}
