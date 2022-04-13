import { z, ZodError } from 'zod';
import formatSchemaError from '../format-schema-error';

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

describe('formatSchemaError()', () => {
  it('warns of required fields', () => {
    expect(formatSchemaError(schemaError() as ZodError)).toContain('required');
  });

  it('warns of invalid types', () => {
    const err = schemaError({ name: 'j', siblings: [22] }) as ZodError;
    const errMessage = formatSchemaError(err);

    expect(errMessage).toContain('Expected string');
    expect(errMessage).toContain('siblings');
  });
});
