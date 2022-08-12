import { Response } from 'express';
import * as admin from 'firebase-admin';
import { log_error, log_info, log_notfound } from '../utils';

type AppUser = {
  uid: string;
  email?: string;
  displayName?: string;
  contactName?: string;
  customerNumber?: number;
  taxNumber?: string;
  phoneNumber?: string;
  role: string;
};

type Request = {
  body: AppUser;
  params: { uid: string };
};

const db = admin.firestore();
const col = 'users';

const getAllUsers = async (req: Request, res: Response) => {
  log_info({ endpoint: 'getAllUsers' });
  try {
    const allUsers: AppUser[] = [];
    const querySnapshot = await db.collection(col).get();
    querySnapshot.forEach((doc: any) => allUsers.push(doc.data()));
    return res.status(200).json(allUsers);
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

const getUser = async (req: Request, res: Response) => {
  log_info({ endpoint: 'getUser', params: req.params });
  try {
    const { uid } = req.params;
    const user = await db.collection(col).doc(uid).get();
    if (!user.exists) {
      const msg = `user with id '${uid}' was not found in the '${col}' collection`;
      log_notfound(msg);
      return res.status(404).json({
        status: 'error',
        message: msg,
      });
    }
    return res.status(200).json(user.data());
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

const addUser = async (req: Request, res: Response) => {
  log_info({
    endpoint: 'addUser',
    params: req.params,
    body: req.body,
  });
  try {
    const { uid } = req.params;
    const user = db.doc(`${col}/${uid}`);
    const userObj = { ...req.body, uid };

    await user.set(userObj, { merge: true });
    return res.status(200).send({
      status: 'success',
      message: 'user added successfully',
      data: userObj,
    });
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  log_info({
    endpoint: 'deleteUser',
    params: req.params,
  });
  try {
    const { uid } = req.params;
    const entry = db.collection(col).doc(uid);
    const user = await entry.get();
    if (!user.exists) {
      const msg = `user with id '${uid}' was not found in the '${col}' collection`;
      log_notfound(msg);
      return res.status(404).json({
        status: 'error',
        message: msg,
      });
    }
    await entry.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    });
    return res.status(200).json({
      status: 'success',
      message: 'user deleted successfully',
    });
  } catch (error: any) {
    log_error(error.message);
    return res.status(500).json(error.message);
  }
};

export { getAllUsers, getUser, addUser, deleteUser };
