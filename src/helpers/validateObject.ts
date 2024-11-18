import { z } from 'zod';

const validateObject = <T>(schema: z.ZodType<T>, obj: DeepPartial<T>): T => {
  const parse = schema.safeParse(obj);
  if (parse.success) return parse.data;
  throw new Error('Zod parse error', {
    cause: parse.error,
  });
};

export default validateObject;
