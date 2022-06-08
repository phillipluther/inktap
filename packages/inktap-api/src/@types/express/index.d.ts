import { RequestData, User } from '@types';

declare module 'express-serve-static-core' {
  interface Request {
    data?: RequestData;
    user?: User;
  }
}
