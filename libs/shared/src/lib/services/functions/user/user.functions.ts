import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared.module';
import { CallableFunctionService } from '../fb.functions';
import { UpdateUserRequest } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserFunctions {
  constructor(private callFn: CallableFunctionService) {}

  getUsers(): Observable<AppUser[]> {
    return this.callFn.call<void, AppUser[]>('getUsers');
  }

  updateUser(req: UpdateUserRequest): Observable<AppUser> {
    return this.callFn.call<UpdateUserRequest, AppUser>('updateUser', req);
  }
}
