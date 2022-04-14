import updateHistory from '../update-history';

describe('utils/updateHistory()', () => {
  const testHistory = [
    new Date(),
    new Date('2022-01-01T00:00:00.000Z'),
    new Date('2021-01-01T00:00:00.000Z'),
  ];

  test('returns an array', () => {
    const arr = updateHistory(testHistory);
    expect(Array.isArray(arr)).toBe(true);
  });

  test('adds an entry for the current date', () => {
    const history = updateHistory(testHistory);
    expect(history).toHaveLength(4);
  });

  test('takes date objects or date strings', () => {
    const history = updateHistory([testHistory[0], '2022-01-01T00:00:00.000Z']);
    expect(history).toHaveLength(3);
  });
});
