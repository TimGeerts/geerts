import { Injectable } from '@angular/core';
import {
  Firestore,
  getDoc,
  getDocs,
  collection,
  QuerySnapshot,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable, from, EMPTY, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // generic 'converter' used to convert firestore documents to typescript classes (and vice versa)
  converter = <T>(): FirestoreDataConverter<T> => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
  });

  // generic 'getAll' function that will get all documents from a specified collection
  getAll<T>(
    col: string,
    conv: FirestoreDataConverter<T> = this.converter<T>()
  ): Observable<T[]> {
    if (!col) return EMPTY;
    return from(
      getDocs<T>(collection(this.firestore, col).withConverter(conv))
    ).pipe(
      take(1),
      map((q) => {
        return this.toArr<T>(q);
      })
    );
  }

  get<T>(
    col: string,
    uid: string,
    conv: FirestoreDataConverter<T> = this.converter<T>()
  ): Observable<T | undefined> {
    const ref = doc(this.firestore, col, uid).withConverter(conv);
    return from(getDoc<T>(ref)).pipe(
      map((d) => (d.exists() ? d.data() : undefined))
    );
  }

  // generic 'set' function used to update all fields of a given object
  set<T>(
    col: string,
    uid: string,
    obj: T,
    conv: FirestoreDataConverter<T> = this.converter<T>()
  ): Observable<T> {
    const ref = doc(this.firestore, col, uid).withConverter(conv);
    return from(setDoc<T>(ref, obj, { merge: true })).pipe(
      take(1),
      map(() => obj)
    );
  }

  // generic helper to convert a QuerySnapshot<T> to an array of <T>
  private toArr<T>(q: QuerySnapshot<T>): T[] {
    const retVal: T[] = new Array<T>();
    q.forEach((doc) => {
      retVal.push(doc.data());
    });
    return retVal;
  }
}
