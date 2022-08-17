import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser, UpdateAuth } from '../../../shared.module';
import { ApiResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  baseUrl = '';

  constructor(
    private http: HttpClient,
    @Inject('apiBaseUrl') private apiBaseUrl: string
  ) {
    this.baseUrl = apiBaseUrl;
  }

  // create(usr: AuthUser): Observable<string> {
  //   const endpoint = `${this.baseUrl}/auth`;
  //   return this.http.post(endpoint, usr, { responseType: 'text' });
  // }

  // update(uid: string, changes: UpdateAuth): Observable<unknown> {
  //   const endpoint = `${this.baseUrl}/auth/]${uid}`;
  //   return this.http.patch(endpoint, changes);
  // }

  delete(uid: string): Observable<ApiResponse<null>> {
    const endpoint = `${this.baseUrl}/auth/${uid}`;
    return this.http.delete<ApiResponse<null>>(endpoint);
  }
}
