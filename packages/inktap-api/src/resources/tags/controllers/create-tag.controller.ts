import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Tag as T } from '@types';
import { formatSchemaError, saveResourceAsJson } from '@utils';
import Tag from '../tag.model';

export default async function (req: Request, res: Response) {
  try {
    const { body: tagData } = req;
    const id = nanoid();
    const tag: T = {
      ...tagData,
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
      await saveResourceAsJson(tag);
      res.status(201).json({
        success: true,
        data: tag,
      });
    }
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
