import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import { GetDocumentRequest, UpdateUserRequest } from '../types';
import {
  checkAdmin,
  checkAuthentication,
  checkData,
  region,
  throwInternalServerError,
} from '../utils';

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

// get all user profiles
const getUser = functions
  .region(region)
  .https.onCall(async (data: GetDocumentRequest, context: CallableContext) => {
    checkAuthentication(context.auth);
    checkData(data);

    try {
      const docRef = admin.firestore().collection('users').doc(data.uid);
      const snap = await docRef.get();
      return snap.data();
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

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

export { updateUser, getUsers, getUser };
