import { FunctionsErrorCode } from 'firebase-functions/lib/common/providers/https';
import * as functions from 'firebase-functions';
import { AuthData } from 'firebase-functions/lib/common/providers/https';

//variables
const region = 'europe-west1';

//logger utils
const log_info = (...args: any[]) => {
  functions.logger.info('api called', ...args);
};

const log_error = (...args: any[]) => {
  functions.logger.error(...args);
};

const log_notfound = (message: string) => {
  log_error(message, { statuscode: '404' });
};

//error handlers
const checkAuthentication = (auth: AuthData | undefined) => {
  const errCode: FunctionsErrorCode = 'unauthenticated';
  const errMessage =
    'The function can not be called without being authenticated.';
  if (!auth) throwError(errCode, errMessage);
};

const checkAdmin = (auth: AuthData | undefined) => {
  const errCode: FunctionsErrorCode = 'permission-denied';
  const errMessage = 'This function can only be executed by administrators.';
  checkAuthentication(auth);
  if (!auth?.token.isAdmin) throwError(errCode, errMessage);
};

const checkData = (data: any | undefined) => {
  const errCode: FunctionsErrorCode = 'invalid-argument';
  let errMessage = 'Data passed to the function was undefined.';

  if (!data) throwError(errCode, errMessage);

  const anythingEmpty = Object.values(data).some(
    (v) => v === null || v === undefined || v === ''
  );
  if (anythingEmpty) {
    errMessage = 'Some of the properties in the data object are undefined.';
    throwError(errCode, errMessage);
  }
};

const throwInternalServerError = (details?: unknown) => {
  throwError('internal', 'internal server error', details);
};

const throwError = (
  code: FunctionsErrorCode,
  message: string,
  details?: unknown
) => {
  log_error(code, details);
  throw new functions.https.HttpsError(code, message, details);
};

export {
  region,
  log_info,
  log_error,
  log_notfound,
  throwError,
  throwInternalServerError,
  checkAuthentication,
  checkAdmin,
  checkData,
};
