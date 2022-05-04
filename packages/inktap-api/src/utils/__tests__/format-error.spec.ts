import { z, ZodError } from 'zod';
import formatError from '../format-error';

const schema = z.object({
  name: z.string(),
  siblings: z.array(z.string()).optional(),
});

function schemaError(
  obj: { name?: number | string; siblings?: number[] | string[] } = {
    name: undefined,
    siblings: ['b', 's'],
  },
) {
  try {
    return schema.parse(obj);
  } catch (err) {
    return err;
  }
}

describe('utils/formatError()', () => {
  it('warns of required schema fields', () => {
    expect(formatError(schemaError() as ZodError)).toContain('required');
  });

  it('warns of invalid schema types', () => {
    const err = schemaError({ name: 'j', siblings: [22] }) as ZodError;
    const errMessage = formatError(err);

    expect(errMessage).toContain('Expected string');
    expect(errMessage).toContain('siblings');
  });

  it('formats generic errors', () => {
    const err = new Error('Invalid');
    expect(formatError(err)).toContain('Invalid');
  });

  it('formats error message strings', () => {
    expect(formatError('bad')).toEqual('bad');
  });

  it('formats unknown errors', () => {
    expect(formatError({})).toEqual('Unknown error');
  });
});
