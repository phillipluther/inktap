export function readFile(filepath: string) {
  if (/FAIL\:readFile/.test(filepath)) {
    throw new Error('bad');
  }

  return Buffer.from('test file contents', 'utf-8');
}

export function readdir(filepath: string) {
  return [
    'testfile1.post.json',
    'testfile2.tag.json',
    'testfile3.md',
    'testfile4.post.md',
    'testfile5.tag.json',
  ];
}
