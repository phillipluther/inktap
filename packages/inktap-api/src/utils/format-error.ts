import { ZodError } from 'zod';

export default (err: Error | ZodError | string): string => {
  let errorMessage: string;

  if (err instanceof ZodError) {
    errorMessage = err.issues
      .map(({ message, path }) => {
        const field = path[0];

        return message === 'Required'
          ? `Field \`${field}\` is required`
          : `${message} for \`${field}\``;
      })
      .join('; ');
  } else if (err instanceof Error) {
    errorMessage = err.toString();
  } else {
    errorMessage = err;
  }

  return errorMessage;
};
