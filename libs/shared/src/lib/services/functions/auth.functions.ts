import { Injectable } from '@angular/core';
import {
  connectFunctionsEmulator,
  Functions,
  getFunctions,
  HttpsCallable,
  httpsCallable,
} from '@angular/fire/functions';
import { catchError, from, map, Observable, take } from 'rxjs';

export type TestRequest = {
  name: string;
  age: number;
};

export type TestResponse = {
  amount: number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthFunctions {
  functions: Functions;

  testCloudFunction!: HttpsCallable<TestRequest, TestResponse>;

  constructor() {
    this.functions = getFunctions();
    connectFunctionsEmulator(this.functions, 'localhost', 5001);
    this.testCloudFunction = httpsCallable<TestRequest, TestResponse>(
      this.functions,
      'resetPassword'
    );
  }

  test(): Observable<TestResponse> {
    return from(this.testCloudFunction({ name: 'jos', age: 10 })).pipe(
      take(1),
      map((r) => {
        return r.data;
      })
    );

    // this.testCloudFunction({name: 'jos', age: 10})
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  testError(): Observable<TestResponse> {
    return from(this.testCloudFunction()).pipe(
      take(1),
      map((r) => {
        return r.data;
      }),
      catchError((err) => {
        throw err;
      })
    );

    // this.testCloudFunction({name: 'jos', age: 10})
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}

//export declare function httpsCallable<RequestData = unknown, ResponseData = unknown>(functionsInstance: Functions, name: string, options?: HttpsCallableOptions): HttpsCallable<RequestData, ResponseData>;
