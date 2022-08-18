import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import { UpdateUserRequest } from '../types';
import {
  checkAdmin,
  checkData,
  region,
  throwInternalServerError,
} from '../utils';

// update user profile
const updateUser = functions
  .region(region)
  .https.onCall(async (data: UpdateUserRequest, context: CallableContext) => {
    checkAdmin(context.auth);
    checkData(data);

    try {
      const docRef = admin.firestore().collection('users').doc(data.uid);
      await docRef.update(data);
      return docRef.get().then((d) => d.data());
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

// get all user profiles
const getUsers = functions
  .region(region)
  .https.onCall(async (data: null, context: CallableContext) => {
    checkAdmin(context.auth);

    try {
      const docRef = admin.firestore().collection('users');
      const snap = await docRef.get();
      return snap.docs.map((d) => d.data());
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

export { updateUser, getUsers };
