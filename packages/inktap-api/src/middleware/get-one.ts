import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import { Resources } from '@types';
import { DATA_DIR, RESOURCE_FILE_SUFFIXES } from '@constants';

export default (resource: Resources) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const resourceDir = path.join(DATA_DIR, resource);
    const suffix = RESOURCE_FILE_SUFFIXES[resource];
    const resourceFilepath = path.join(resourceDir, `${id}${suffix}`);

    if (!existsSync(resourceFilepath)) {
      return res.status(404).json({
        success: false,
        data: `Could not find ${resource} with ID \`${id}\``,
      });
    }

    const fileContents = await readFile(resourceFilepath);
    req.data = fileContents.toString();
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: `Internal error getting ${resource}`,
    });
  }

  // handle options ... filtering, pagination, limit, etc.
};
