import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../shared.module';
import { AppUser } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth!: Auth;
  userData!: AppUser | null; // Save logged in user data
  constructor(private firestore: Firestore, private userService: UserService) {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.getUserData(user.uid);
      } else {
        localStorage.setItem('user', 'null');
        this.userData = null;
      }
    });
  }

  // Sign in
  public signIn(email: string, password: string): Observable<UserCredential> {
    const loginPromise = signInWithEmailAndPassword(this.auth, email, password);
    return from(loginPromise);
  }

  public createUser(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(take(1));
  }

  // Sign up
  // public createUser(usr: AppUser): Observable<UserCredential> {
  //   if (!usr.email || !usr.password || !usr.displayName) {
  //     return EMPTY;
  //   }
  //   const userCreationPromise = createUserWithEmailAndPassword(
  //     this.auth,
  //     usr.email,
  //     usr.password
  //   );
  //   userCreationPromise.then((u: UserCredential) => {
  //     this.setUserData(u.user, usr.displayName);
  //   });
  //   return from(userCreationPromise);
  // }

  // Update user
  public updateUser(userData: AppUser): Observable<void> {
    return from(
      updateDoc(doc(this.firestore, `users/${userData.uid}`), {
        ...userData,
      })
    );
  }

  // Sign out
  public signOut() {
    const signOutPromise = signOut(this.auth);
    signOutPromise.then(() => {
      localStorage.removeItem('user');
    });
    return from(signOutPromise);
  }

  // async setUserData(user: User, displayName: string | null): Promise<void> {
  //   const userData: AppUser = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: displayName,
  //     role: 'member',
  //   };
  //   await updateDoc(doc(this.firestore, `users/${user.uid}`), {
  //     ...userData,
  //   });
  // }

  getUserData(uid: string): void {
    this.userService.get(uid).subscribe((u) => {
      if (!u) throw 'user not found';
      this.userData = u;
      localStorage.setItem('user', u.uid);
    });
  }

  get isAdmin(): boolean {
    return this.userData?.role === 'admin' || false;
  }
}
