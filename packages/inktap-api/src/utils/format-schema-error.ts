import { ZodError } from 'zod';

export default (err: ZodError): string => {
  const messages = err.issues.map(({ message, path }) => {
    const field = path[0];

    return message === 'Required'
      ? `Field \`${field}\` is required`
      : `${message} for \`${field}\``;
  });

  return messages.join('; ');
};
