import getResourceType from '../get-resource-type';

describe('utils/getResourceType()', () => {
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

  test('can identify a post', () => {
    expect(getResourceType(testPost)).toEqual('post');
  });

  test('can identify a tag', () => {
    expect(getResourceType(testTag)).toEqual('tag');
  });

  test('returns null if no matching resource type', () => {
    // @ts-ignore
    expect(getResourceType({ id: '1234' })).toBeNull();
  });
});
