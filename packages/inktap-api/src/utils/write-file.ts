import { mkdir, writeFile as nativeWriteFile } from 'fs/promises';
import path from 'path';

export default async function writeFile(filepath: string, fileContents: string): Promise<string> {
  try {
    const { dir } = path.parse(filepath);

    await mkdir(dir, { recursive: true });
    await nativeWriteFile(filepath, fileContents);

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not write file');
  }
}
