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
  const errMessage = 'The function must be called while authenticated.';

  if (!auth) {
    log_error(errCode);
    throw new functions.https.HttpsError(errCode, errMessage);
  }
};

const checkData = (data: any | undefined) => {
  const errCode: FunctionsErrorCode = 'invalid-argument';
  let errMessage = 'Data passed to the function was undefined.';

  if (!data) {
    log_error(errCode, errMessage);
    throw new functions.https.HttpsError(errCode, errMessage);
  }

  const anythingEmpty = Object.values(data).some(
    (v) => v === null || v === undefined || v === ''
  );
  if (anythingEmpty) {
    log_error(errCode, errMessage);
    errMessage = 'Some of the properties in the data object are undefined.';
    throw new functions.https.HttpsError(errCode, errMessage);
  }
};

export {
  region,
  log_info,
  log_error,
  log_notfound,
  checkAuthentication,
  checkData,
};
