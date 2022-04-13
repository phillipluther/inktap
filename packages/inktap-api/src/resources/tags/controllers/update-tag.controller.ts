import { Request, Response } from 'express';
import path from 'path';
import { TAGS_DIR } from '@constants';
import { getFilepathFromResource, readFile, saveResourceAsJson } from '@utils';
import { Tag as T } from '@types';
import Tag from '../tag.model';

export default async function updateTag(req: Request, res: Response) {
  try {
    const filepath = getFilepathFromResource({
      id: '12345',
      name: 'test-tag',
      created: new Date(),
    });
    res.status(200).send(filepath);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not update tag',
    });
  }
}
