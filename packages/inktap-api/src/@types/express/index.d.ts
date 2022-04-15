import { Express } from 'express-serve-static-core';
import { Post, Tag } from '@types';
import { ZodError, ZodErrorMap } from 'zod';

declare module 'express-serve-static-core' {
  interface Request {
    data?: string | string[];
    resource?: {
      isValid: boolean;
      data?: Post | Tag;
      error?: ZodFormattedError;
    };
  }
}
