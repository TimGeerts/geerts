import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared.module';
import { CallableFunctionService } from '../fb.functions';
import { GetDocumentRequest, UpdateUserRequest } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserFunctions {
  constructor(private callFn: CallableFunctionService) {}

  getUsers(): Observable<AppUser[]> {
    return this.callFn.call<void, AppUser[]>('getUsers');
  }

  getUser(req: GetDocumentRequest): Observable<AppUser> {
    return this.callFn.call<GetDocumentRequest, AppUser>('getUser', req);
  }

  updateUser(req: UpdateUserRequest): Observable<AppUser> {
    return this.callFn.call<UpdateUserRequest, AppUser>('updateUser', req);
  }
}
