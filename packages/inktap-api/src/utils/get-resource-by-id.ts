import path from 'path';
import { readFile } from 'fs/promises';
import { Resources } from '@types';
import { DATA_DIR, RESOURCE_FILE_SUFFIXES } from '@constants';
import Tag from '@src/resources/tags/tag.model';
import Post from '@src/resources/posts/post.model';

const models = {
  tags: Tag,
  posts: Post,
};

export default async function (resource: Resources, id: string) {
  try {
    const suffix = RESOURCE_FILE_SUFFIXES[resource];
    const filepath = path.join(DATA_DIR, resource, `${id}${suffix}`);
    const data = await readFile(filepath, 'utf-8');

    return models[resource].parse(data);
  } catch (err) {
    console.error('ERROR:', `Could not get ${resource} with ID ${id}`);
    throw err;
  }
}
