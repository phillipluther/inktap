import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { getFilepathFromResource } from '@src/utils';
import { Tag, Post } from '@types';
import matter from 'gray-matter';

export default async function saveResource(resource: Tag | Post): Promise<string> {
  try {
    const filepath = getFilepathFromResource(resource);
    const { dir } = path.parse(filepath);
    const saveActions: Promise<void>[] = [];

    await mkdir(dir, { recursive: true });

    if (/\.md$/.test(filepath)) {
      const { markdown, markup, ...frontmatter } = resource as Post;
      const md = matter.stringify(markdown, frontmatter);

      saveActions.push(writeFile(filepath, md));
    } else {
      saveActions.push(writeFile(filepath, JSON.stringify(resource)));
    }

    await Promise.all(saveActions);

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not save resource');
  }
}
