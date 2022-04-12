import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import { Resources } from '@types';
import { DATA_DIR, RESOURCE_FILE_SUFFIXES } from '@constants';

export default (resource: Resources) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resourceDir = path.join(DATA_DIR, resource);
    const suffix = RESOURCE_FILE_SUFFIXES[resource];

    const filenames = await readdir(resourceDir);
    const suffixTest = new RegExp(suffix);
    const results = [];

    if (existsSync(resourceDir)) {
      for (let filename of filenames) {
        if (suffixTest.test(filename)) {
          const result = await readFile(path.join(resourceDir, filename));
          results.push(result.toString());
        }
      }
    }

    req.data = results;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      data: 'Internal error getting posts',
    });
  }

  // handle options ... filtering, pagination, limit, etc.
};
