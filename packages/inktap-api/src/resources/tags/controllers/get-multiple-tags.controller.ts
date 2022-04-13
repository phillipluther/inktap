import { Request, Response } from 'express';
import { forEachFile } from '@utils';
import { Tag as T } from '@types';
import { TAGS_DIR } from '@constants';

export default async (req: Request, res: Response) => {
  try {
    const data: T[] = [];
    await forEachFile(TAGS_DIR, (fileContents) => {
      data.push(JSON.parse(fileContents));
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not get tags');
  }
};
