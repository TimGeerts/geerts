import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import {
  CreateUserRequest,
  DeleteUserRequest,
  ResetPasswordRequest,
} from '../types';
import {
  region,
  checkData,
  checkAdmin,
  throwInternalServerError,
} from '../utils';

const auth = admin.auth();

// reset password for an authentication record
const resetPassword = functions
  .region(region)
  .https.onCall(
    async (data: ResetPasswordRequest, context: CallableContext) => {
      checkAdmin(context.auth);
      checkData(data);

      try {
        const updatedUser = await auth.updateUser(data.uid, {
          password: data.password,
        });
        return updatedUser;
      } catch (error: any) {
        return throwInternalServerError(error);
      }
    }
  );

// create authentication record and user profile
const createUser = functions
  .region(region)
  .https.onCall(async (data: CreateUserRequest, context: CallableContext) => {
    checkAdmin(context.auth);
    checkData(data);

    try {
      //create the auth record
      const newAuth = await auth.createUser(data.auth);
      //extract user data from request
      const userReq = data.user;
      //set the uid for the new user record
      userReq.uid = newAuth.uid;
      // create the user record (firestore)
      await admin.firestore().collection('users').doc(userReq.uid).set(userReq);
      return userReq;
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

// delete authentication record and user profile
const deleteUser = functions
  .region(region)
  .https.onCall(async (data: DeleteUserRequest, context: CallableContext) => {
    checkAdmin(context.auth);
    checkData(data);

    try {
      // delete the authentication record
      await auth.deleteUser(data.uid);
      // delete the user record in the 'users' collection
      const docRef = admin.firestore().collection('users').doc(data.uid);
      await docRef.delete();
      return true;
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

export { resetPassword, createUser, deleteUser };
