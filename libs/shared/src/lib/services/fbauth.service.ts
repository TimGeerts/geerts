import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { EMPTY, from, Observable, of } from 'rxjs';
import { AppUser } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: AppUser | null; // Save logged in user data
  constructor(private auth: Auth, private firestore: Firestore) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserData(user.uid)
          .then((u) => {
            this.userData = u;
            localStorage.setItem('user', JSON.stringify(user));
          })
          .catch((error) => {
            console.log(error);
          });
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

  // Sign up
  public createUser(usr: AppUser): Observable<UserCredential> {
    if (!usr.email || !usr.password || !usr.displayName) {
      return EMPTY;
    }
    const userCreationPromise = createUserWithEmailAndPassword(
      this.auth,
      usr.email,
      usr.password
    );
    userCreationPromise.then((u: UserCredential) => {
      this.setUserData(u.user, usr.displayName);
    });
    return from(userCreationPromise);
  }

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

  async setUserData(user: User, displayName: string | null): Promise<void> {
    const userData: AppUser = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: 'member',
    };
    await updateDoc(doc(this.firestore, `users/${user.uid}`), {
      ...userData,
    });
  }

  async getUserData(uid: string): Promise<AppUser> {
    const userData = await getDoc(doc(this.firestore, `users/${uid}`));
    return new Promise((resolve, reject) => {
      if (userData.exists()) {
        const data = userData.data();
        resolve({
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          role: data.role,
        });
      } else {
        reject();
      }
    });
  }

  get isAdmin(): boolean {
    return this.userData?.role === 'admin' || false;
  }

  // // Returns true when user is looged in and email is verified
  // get isLoggedIn(): boolean {
  //   const storageUser = localStorage.getItem('user');
  //   if (!storageUser) return false;
  //   const user = JSON.parse(storageUser);
  //   return user !== null;
  // }

  // // returns the logged in user
  // get loggedInUser(): AppUser | null {
  //   const storageUser = localStorage.getItem('user');
  //   if (!storageUser) return null;
  //   return JSON.parse(storageUser);
  // }
}

// import { Injectable, NgZone } from '@angular/core';
// import { AppUser } from '../types/user';
// import * as auth from 'firebase/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';
// import { Router } from '@angular/router';
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   userData: any; // Save logged in user data
//   constructor(
//     public afs: AngularFirestore, // Inject Firestore service
//     public afAuth: AngularFireAuth, // Inject Firebase auth service
//     public router: Router,
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {
//     /* Saving user data in localstorage when
//     logged in and setting up null when logged out */
//     this.afAuth.authState.subscribe((user) => {
//       console.log(JSON.stringify(user));
//       if (user) {
//         this.userData = user;
//         localStorage.setItem('user', JSON.stringify(this.userData));
//       } else {
//         localStorage.setItem('user', 'null');
//       }
//     });
//   }
//   // Sign in with email/password
//   signIn(email: string, password: string) {
//     return this.afAuth
//       .signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         // this.ngZone.run(() => {
//         //   this.router.navigate(['dashboard']);
//         // });
//         this.setUserData(result.user);
//       });
//   }
//   // Sign up with email/password
//   signUp(email: string, password: string) {
//     return this.afAuth
//       .createUserWithEmailAndPassword(email, password)
//       .then((result) => {
//         this.setUserData(result.user);
//       })
//       .catch((error) => {
//         window.alert(error.message);
//       });
//   }

//   // Send email verfificaiton when new user sign up
//   sendVerificationMail() {
//     return this.afAuth.currentUser
//       .then((u: any) => u.sendEmailVerification())
//       .then(() => {
//         this.router.navigate(['verify-email-address']);
//       });
//   }

//   // Reset Forggot password
//   forgotPassword(passwordResetEmail: string) {
//     return this.afAuth
//       .sendPasswordResetEmail(passwordResetEmail)
//       .then(() => {
//         window.alert('Password reset email sent, check your inbox.');
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   }

//   // Returns true when user is looged in and email is verified
//   get isLoggedIn(): boolean {
//     const storageUser = localStorage.getItem('user');
//     if (!storageUser) return false;
//     const user = JSON.parse(storageUser);
//     return user !== null;
//   }

//   // returns the logged in user
//   get loggedInUser(): AppUser | null {
//     const storageUser = localStorage.getItem('user');
//     if (!storageUser) return null;
//     return JSON.parse(storageUser);
//   }

//   // Sign in with Google
//   googleAuth() {
//     return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
//       if (res) {
//         this.router.navigate(['dashboard']);
//       }
//     });
//   }
//   // Auth logic to run auth providers
//   authLogin(provider: any) {
//     return this.afAuth
//       .signInWithPopup(provider)
//       .then((result) => {
//         this.ngZone.run(() => {
//           this.router.navigate(['dashboard']);
//         });
//         this.setUserData(result.user);
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   }
//   /* Setting up user data when sign in with username/password,
//   sign up with username/password and sign in with social auth
//   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//   setUserData(user: any) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//       `users/${user.uid}`
//     );
//     const userData: AppUser = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       role: 'member',
//     };
//     return userRef.set(userData, {
//       merge: true,
//     });
//   }
//   // Sign out
//   signOut() {
//     return this.afAuth.signOut().then(() => {
//       localStorage.removeItem('user');
//     });
//   }
// }
