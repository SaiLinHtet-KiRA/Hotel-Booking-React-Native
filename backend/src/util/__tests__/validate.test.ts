import { z } from "zod";
import { validateZod } from "../validate";
import { ValidationError } from "../error/errors";

describe("validateZod", () => {
  const TestSchema = z.object({
    name: z.string().min(1),
    age: z.number().min(0).max(150),
    email: z.string().email().optional(),
  });

  it("returns parsed data for valid input", () => {
    const data = { name: "John", age: 30, email: "john@test.com" };
    const result = validateZod(TestSchema, data);

    expect(result).toEqual(data);
  });

  it("returns parsed data without optional field", () => {
    const data = { name: "Jane", age: 25 };
    const result = validateZod(TestSchema, data);

    expect(result).toEqual(data);
  });

  it("throws ValidationError for missing required field", () => {
    expect(() => validateZod(TestSchema, { age: 30 })).toThrow(
      ValidationError,
    );
  });

  it("throws ValidationError for invalid type", () => {
    expect(() =>
      validateZod(TestSchema, { name: "John", age: "not-a-number" }),
    ).toThrow(ValidationError);
  });

  it("throws ValidationError for out-of-range value", () => {
    expect(() =>
      validateZod(TestSchema, { name: "John", age: 200 }),
    ).toThrow(ValidationError);
  });

  it("throws ValidationError for negative age", () => {
    expect(() =>
      validateZod(TestSchema, { name: "John", age: -5 }),
    ).toThrow(ValidationError);
  });

  it("throws ValidationError for empty object", () => {
    expect(() => validateZod(TestSchema, {})).toThrow(ValidationError);
  });
});
