import path from 'path';
import matter from 'gray-matter';
import { mkdir, writeFile } from 'fs/promises';
import { Post } from '@types';
import { getFilepathFromResource } from '@utils';

export default async function saveResourceAsMarkdown(resource: Post): Promise<string> {
  try {
    const filepath = getFilepathFromResource(resource).toString();
    const { dir } = path.parse(filepath);
    await mkdir(dir, { recursive: true });

    const { markdown, markup, ...frontmatter } = resource;
    const md = matter.stringify(markdown, frontmatter);

    await writeFile(filepath, md);

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not write data to file');
  }
}
