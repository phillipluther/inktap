import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

export default async function readFromFile(filepath: string): Promise<string | null> {
  if (!existsSync(filepath)) {
    return null;
  }

  return await readFile(filepath, 'utf-8');
}
