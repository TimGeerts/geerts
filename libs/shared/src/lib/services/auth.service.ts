import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth!: Auth;
  currentUser!: User | null;
  $loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore) {
    this.auth = getAuth(this.firestore.app);
    onAuthStateChanged(this.auth, (user) => {
      //trigger this once, so it can be subscribed to on a page load to know when firebase has done it's auth check
      if (user) {
        this.currentUser = user;
        this.$loggedIn.next(true);
        this.setRole(user);
        localStorage.setItem('user', user.uid);
      } else {
        this.currentUser = null;
        this.$loggedIn.next(false);
        this.isAdmin.next(false);
        localStorage.removeItem('user');
      }
    });
  }

  private setRole(user: User | null) {
    if (!user) {
      this.isAdmin.next(false);
    } else {
      user
        .getIdTokenResult()
        .then((token) => {
          this.isAdmin.next(!!token.claims.isAdmin);
        })
        .catch(() => {
          this.isAdmin.next(false);
        });
    }
  }

  // Sign in
  public signIn(email: string, password: string): Observable<UserCredential> {
    const loginPromise = signInWithEmailAndPassword(this.auth, email, password);
    return from(loginPromise);
  }

  // Sign out
  public signOut() {
    signOut(this.auth);
  }
}
