import { Express } from 'express-serve-static-core';
import { RequestData } from '@types';
import { ZodError } from 'zod';

declare module 'express-serve-static-core' {
  interface Request {
    data?: RequestData;
  }
}
