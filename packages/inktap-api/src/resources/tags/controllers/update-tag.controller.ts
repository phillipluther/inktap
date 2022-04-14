import { Request, Response } from 'express';
import { Tag as T } from '@types';
import { formatSchemaError, saveResourceAsJson, getResourceById, updateHistory } from '@utils';
import Tag from '../tag.model';

export default async function updateTag(req: Request, res: Response) {
  try {
    const existingTag = await getResourceById('tag', req.params.id);
    const { id: noIdUpdate, created: noDateChange, ...updates } = req.body;
    const { id, created, updated, ...existingTagData } = existingTag as T;

    const updatedTag = {
      id,
      created: new Date(created),
      ...existingTagData,
      ...updates,
      updated: updateHistory(updated || []),
    };

    const validation = Tag.safeParse(updatedTag);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
    } else {
      await saveResourceAsJson(updatedTag);
      res.status(200).json({
        success: true,
        data: updatedTag,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not update tag',
    });
  }
}
