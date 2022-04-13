import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { Tag as T } from '@types';
import { TAGS_DIR } from '@constants';
import { formatSchemaError, saveResourceAsJson } from '@utils';
import Tag from '../tag.model';

export default async function (req: Request, res: Response) {
  try {
    const id = nanoid();
    const tag: T = {
      ...req.body,
      id,
      created: new Date(),
    };

    const validation = Tag.safeParse(tag);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
    } else {
      await saveResourceAsJson(TAGS_DIR, tag);
      res.status(201).json({
        success: true,
        data: tag,
      });
    }

    // await mkdir(TAGS_DIR, { recursive: true });
    // const tagFilepath = path.join(TAGS_DIR, `${id}${TAG_SUFFIX}`);
    // await writeFile(tagFilepath, JSON.stringify(tag));
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not create tag',
    });
  }
}
