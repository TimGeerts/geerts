import * as admin from 'firebase-admin';
admin.initializeApp();

import { getUsers, updateUser } from './user';
import { createUser, deleteUser, resetPassword } from './auth';
import { onUpdateUser } from './triggers';

// ########## CALLABLE FUNCTIONS ##########
// - AUTH -
exports.resetPassword = resetPassword;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
// -COLLECTIONS-
// -- 'users' --
exports.getUsers = getUsers;
// exports.getUser = getUser; //TODO comes with 'profile page' task (trello)
exports.updateUser = updateUser;

// ########## TRIGGERS ##########
exports.onUpdateUser = onUpdateUser;
