import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared.module';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  COL = 'users';

  constructor(private firestoreService: FirestoreService) {}

  getAll(): Observable<AppUser[]> {
    return this.firestoreService.getAll<AppUser>(this.COL);
  }

  set(usr: AppUser): Observable<AppUser> {
    return this.firestoreService.set<AppUser>(this.COL, usr.uid, usr);
  }
}
