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
    req.billingAddress = {
      street: 'Spaansemolenstraat',
      number: '26',
      numberExtra: '1',
      zipcode: '2040',
      city: 'Zandvliet',
      country: 'België',
    };
    req.shippingAddress = {
      street: 'Spaansemolenstraat',
      number: '26',
      numberExtra: '1',
      zipcode: '2040',
      city: 'Zandvliet',
      country: 'België',
    };
    return this.callFn.call<UpdateUserRequest, fsUser>('updateUser', req);
  }
}
