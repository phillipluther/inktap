import path from 'path';
import getFilepathFromResource from '../get-filepath-from-resource';
import { RESOURCE_DIRS, RESOURCE_SUFFIXES } from '@constants';

describe('utils/getFilepathFromResource()', () => {
  const testTag = {
    id: '123',
    name: 'test',
    created: new Date(),
    updated: [],
  };

  const testPost = {
    id: '234',
    title: 'Test',
    markdown: 'test',
    created: new Date(),
    updated: [],
  };

  test('returns a string', () => {
    const filepath = getFilepathFromResource(testTag);
    expect(typeof filepath).toEqual('string');
  });

  test('given a tag, resolves to the correct data dir', () => {
    const filepath = getFilepathFromResource(testTag);
    const correctPath = path.join(RESOURCE_DIRS.tag, `${testTag.id}${RESOURCE_SUFFIXES.tag}`);
    expect(filepath).toEqual(correctPath);
  });

  test('given a post, resolves to the correct data dir', () => {
    const filepath = getFilepathFromResource(testPost);
    const correctPath = path.join(RESOURCE_DIRS.post, `${testPost.id}${RESOURCE_SUFFIXES.post}`);
    expect(filepath).toEqual(correctPath);
  });
});
