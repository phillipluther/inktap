import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { getFilepathFromResource } from '@src/utils';
import { Tag, Post } from '@types';
import matter from 'gray-matter';

export default async function saveResource(resource: Tag | Post): Promise<string> {
  try {
    const filepath = getFilepathFromResource(resource);
    const { dir } = path.parse(filepath);

    console.log('FILEPATH', filepath);
    await mkdir(dir, { recursive: true });

    if (/\.md$/.test(filepath)) {
      const { markdown, markup, ...frontmatter } = resource as Post;
      const md = matter.stringify(markdown, frontmatter);
      await writeFile(filepath, md);
    } else {
      await writeFile(filepath, JSON.stringify(resource));
    }

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not save resource');
  }
}
