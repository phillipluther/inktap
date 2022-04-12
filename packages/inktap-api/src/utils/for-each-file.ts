import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';

export default async function (dir: string, iterator: (s: string) => void): Promise<void> {
  try {
    if (!existsSync(dir)) {
      return;
    }

    const data = [];
    for (let filename of await readdir(dir)) {
      const content = await readFile(path.join(dir, filename), 'utf-8');
      data.push(iterator(content));
    }
  } catch (err) {
    console.error(err);
    throw new Error('Could not read from directory');
  }
}
