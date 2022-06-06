import hash, { hashCheck } from '../hash';
import bcrypt from 'bcryptjs';

describe('utils/hash()', () => {
  const testString = 'password';
  let hashed: string;

  beforeEach(() => {
    hashed = hash(testString);
  });

  test('it hashes a string', () => {
    expect(hashed.indexOf(hashCheck)).toEqual(0);
  });

  test('it does not rehash a string', () => {
    expect(hash(hashed)).toEqual(hashed);
  });
});
