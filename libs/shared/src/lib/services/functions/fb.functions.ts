import { Injectable } from '@angular/core';
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from '@angular/fire/functions';
import { Observable, from } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CallableFunctionService {
  functions = getFunctions(undefined, 'europe-west1');

  constructor() {
    connectFunctionsEmulator(this.functions, 'localhost', 5001);
  }

  // generic function to call a Firebase callable function
  call<T, R>(functionName: string, param?: T): Observable<R> {
    const fnRef = httpsCallable<T, R>(this.functions, functionName);
    return from(fnRef(param)).pipe(
      take(1),
      map((r) => {
        return r.data;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
