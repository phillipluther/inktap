import createSlug from '../create-slug';

describe('createSlug()', () => {
  test('returns a slugified string from a given sentence', () => {
    expect(createSlug('my funny slug')).toEqual('my-funny-slug');
  });

  test('lowercases all words', () => {
    expect(createSlug('A Proper Title')).toEqual('a-proper-title');
  });

  test('uses a max of 5 words to slugify', () => {
    expect(createSlug('Some Long Sentence With Many Words and Such')).toEqual(
      'some-long-sentence-with-many',
    );
  });

  test('strips punctuation', () => {
    expect(createSlug("Behold! That, Friend. That's It?")).toEqual('behold-that-friend-thats-it');
  });
});
