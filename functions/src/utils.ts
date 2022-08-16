import * as functions from 'firebase-functions';

const log_info = (...args: any[]) => {
  functions.logger.info('api called', ...args);
};

const log_error = (...args: any[]) => {
  functions.logger.error(...args);
};

const log_notfound = (message: string) => {
  log_error(message, { statuscode: '404' });
};

export { log_info, log_error, log_notfound };
