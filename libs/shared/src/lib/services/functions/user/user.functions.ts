import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fsUser } from '../../../shared.module';
import { CallableFunctionService } from '../fb.functions';
import { GetDocumentRequest, UpdateUserRequest } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserFunctions {
  constructor(private callFn: CallableFunctionService) {}

  getUsers(): Observable<fsUser[]> {
    return this.callFn.call<void, fsUser[]>('getUsers');
  }

  getUser(req: GetDocumentRequest): Observable<fsUser> {
    return this.callFn.call<GetDocumentRequest, fsUser>('getUser', req);
  }

  updateUser(req: UpdateUserRequest): Observable<fsUser> {
    return this.callFn.call<UpdateUserRequest, fsUser>('updateUser', req);
  }
}
