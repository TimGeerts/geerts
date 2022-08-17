import { Response } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import {
  CreateUserRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
} from '../types';
import {
  region,
  log_error,
  log_info,
  log_notfound,
  checkData,
  checkAdmin,
  throwInternalServerError,
} from '../utils';

type AuthUser = {
  email: string;
  password: string;
  displayName: string;
};

type Request = {
  body: AuthUser;
  params: { uid: string };
};

type UpdateAuth = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
};

type UpdateAuthRequest = {
  body: UpdateAuth;
  params: { uid: string };
};

const auth = admin.auth();

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

const createUser = functions
  .region(region)
  .https.onCall(async (data: CreateUserRequest, context: CallableContext) => {
    checkAdmin(context.auth);
    checkData(data);

    try {
      const newAuth = await auth.createUser(data.auth); //create the auth record
      const userReq = data.user;
      userReq.uid = newAuth.uid; //set the uid for the new user record
      await admin.firestore().collection('users').add(userReq); // create the user record (firestore)
      return userReq;
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

//TODO should move to user functions, this is not AUTH
const updateUser = functions
  .region(region)
  .https.onCall(async (data: UpdateUserRequest, context: CallableContext) => {
    checkAdmin(context.auth);
    checkData(data);

    try {
      const docRef = admin.firestore().collection('users').doc(data.uid);
      await docRef.set(data, { merge: true });
      return docRef.get().then((d) => d.data());
    } catch (error) {
      return throwInternalServerError(error);
    }
  });

// OLD FUNCTIONS! ---------------------------------------------------

const createAuth = async (req: Request, res: Response) => {
  log_info({ endpoint: 'createAuth', body: req.body });
  try {
    const newAuth = await auth.createUser(req.body);
    return res.status(201).send(newAuth.uid);
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json({
      code: error.code,
      message: error.message,
    });
    // return res.status(500).send(`[${error.code}] ${error.message}`);
  }
};

const updateAuth = async (req: UpdateAuthRequest, res: Response) => {
  log_info({
    endpoint: 'updateAuth',
    params: req.params,
    body: req.body,
  });
  try {
    const { uid } = req.params;
    const userExists = await doesUserExist(uid);
    if (!userExists) {
      const msg = `authentication record with id '${uid}' was not found`;
      log_notfound(msg);
      return res.status(404).json({
        status: 'error',
        message: msg,
      });
    }
    const newAuth = await auth.updateUser(uid, req.body);
    return res.status(200).send({
      status: 'success',
      message: 'authentication record updated successfully',
      data: newAuth,
    });
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

const deleteAuth = async (req: Request, res: Response) => {
  log_info({
    endpoint: 'deleteAuth',
    params: req.params,
  });
  try {
    const { uid } = req.params;
    const userExists = await doesUserExist(uid);
    if (!userExists) {
      const msg = `authentication record with id '${uid}' was not found`;
      log_notfound(msg);
      return res.status(404).json({
        status: 'error',
        message: msg,
      });
    }
    await auth.deleteUser(uid);
    return res.status(200).send({
      status: 'success',
      message: 'authentication record deleted successfully',
    });
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

const setAdmin = async (req: Request, res: Response) => {
  log_info({
    endpoint: 'setAdmin',
    params: req.params,
  });
  try {
    const { uid } = req.params;
    const msg = `successfully added customclaim { isAdmin: true } to user '${uid}'`;
    await auth.setCustomUserClaims(uid, { isAdmin: true });
    return res.status(200).json({
      status: 'success',
      message: msg,
    });
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

// useful helper because auth.getUser doesn't return a DocumentReference you can check for existence but a Promise
const doesUserExist = (uid: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    auth
      .getUser(uid)
      .then((u) => {
        resolve(true);
      })
      .catch((e) => {
        resolve(false);
      });
  });
};

export {
  resetPassword,
  createUser,
  updateUser,
  createAuth,
  deleteAuth,
  updateAuth,
  setAdmin,
};
