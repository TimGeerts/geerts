import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { region } from './utils';

// - trigger: when a user record is updated
// - condition: only when the displayName property is changed
// - execute: update displayName of the authenticationrecord
const onUpdateUser = functions
  .region(region)
  .firestore.document('users/{uid}')
  .onUpdate((change, context) => {
    const previousValue = change.before.data();
    const newValue = change.after.data();

    if (previousValue?.displayName !== newValue?.displayName) {
      return admin.auth().updateUser(context.params.uid, {
        displayName: newValue?.displayName,
      });
    }
    return;
  });

export { onUpdateUser };
