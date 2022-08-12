import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared.module';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  baseUrl = '';

  constructor(
    private http: HttpClient,
    @Inject('apiBaseUrl') private apiBaseUrl: string
  ) {
    this.baseUrl = apiBaseUrl;
  }

  getAll(): Observable<AppUser[]> {
    const endpoint = `${this.baseUrl}/users`;
    return this.http.get<AppUser[]>(endpoint);
  }

  get(uid: string): Observable<AppUser> {
    const endpoint = `${this.baseUrl}/users/${uid}`;
    return this.http.get<AppUser>(endpoint);
  }

  create(usr: AppUser): Observable<AppUser> {
    const endpoint = `${this.baseUrl}/users/${usr.uid}`;
    return this.http.post<AppUser>(endpoint, usr);
  }

  // set(usr: AppUser): Observable<AppUser> {
  //   return this.firestoreService.set<AppUser>(this.COL, usr.uid, usr);
  // }
}
