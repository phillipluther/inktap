import { Express } from 'express-serve-static-core';
import { Post, Tag } from '@types';

declare module 'express-serve-static-core' {
  interface Request {
    data?: string | string[];
    resource?: Post | Tag;
  }
}
