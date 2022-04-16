import { Express } from 'express-serve-static-core';
import { Post, Tag } from '@types';
import { ZodError } from 'zod';

declare module 'express-serve-static-core' {
  interface Request {
    data?: {
      isValid: boolean;
      result?: Post | Tag | Post[] | Tag[];
      error?: ZodError | string;
    };
    resource?: {
      isValid: boolean;
      data?: Post | Tag;
      error?: ZodError | string;
    };
  }
}
