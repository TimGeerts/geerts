import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import * as express from 'express';
import * as cors from 'cors';
import { addUser, deleteUser, getAllUsers, getUser } from './user';
import {
  createAuth,
  deleteAuth,
  resetPassword,
  setAdmin,
  updateAuth,
} from './auth';

const region = 'europe-west1';
const app = express().use(cors());
// root
app.get('/', (req, res) => res.status(418).send('Hey there!'));
// auth
app.post('/auth', createAuth);
app.delete('/auth/:uid', deleteAuth);
app.patch('/auth/:uid', updateAuth);
app.get('/auth/admin/:uid', setAdmin); //TODO disable this route before going live
// users
app.get('/users', getAllUsers);
app.get('/users/:uid', getUser);
app.post('/users/:uid', addUser);
app.delete('/users/:uid', deleteUser);
// app.patch('/entries/:entryId', updateUser)
// app.delete('/entries/:entryId', deleteUser)

exports.api = functions.region(region).https.onRequest(app);

exports.onUpdateUser = functions
  .region(region)
  .firestore.document('users/{uid}')
  .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const previousValue = change.before.data();
    const newValue = change.after.data();

    if (previousValue?.displayName !== newValue?.displayName) {
      return admin.auth().updateUser(context.params.uid, {
        displayName: newValue?.displayName,
      });
    }
    return;
  });

//callable functions test
exports.resetPassword = resetPassword;

//export declare type FunctionsErrorCodeCore = 'ok' | 'cancelled' | 'unknown' | 'invalid-argument' | 'deadline-exceeded' | 'not-found' | 'already-exists' | 'permission-denied' | 'resource-exhausted' | 'failed-precondition' | 'aborted' | 'out-of-range' | 'unimplemented' | 'internal' | 'unavailable' | 'data-loss' | 'unauthenticated';
