import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { Tag as T } from '@types';
import { TAGS_DIR, TAG_SUFFIX } from '@constants';
import { formatSchemaError } from '../../../utils';
import Tag from '../tag.model';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const id = nanoid();
    const tag: T = {
      ...req.body,
      id,
      created: new Date(),
    };

    const validation = Tag.safeParse(tag);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
    }

    await mkdir(TAGS_DIR, { recursive: true });
    const tagFilepath = path.join(TAGS_DIR, `${id}${TAG_SUFFIX}`);
    await writeFile(tagFilepath, JSON.stringify(tag));

    return res.status(201).json({
      success: true,
      data: tag,
    });
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    return res.status(500).json({
      success: false,
      data: 'Internal error creating tag',
    });
  }
}
