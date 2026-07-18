import { ZodSchema } from "zod";
import { ValidationError } from "./error/errors";

export function validateZod<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.issues[0].message);
  }
  return result.data;
}
