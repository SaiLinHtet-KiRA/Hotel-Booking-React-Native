"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validate_1 = require("../validate");
const errors_1 = require("../error/errors");
describe("validateZod", () => {
    const TestSchema = zod_1.z.object({
        name: zod_1.z.string().min(1),
        age: zod_1.z.number().min(0).max(150),
        email: zod_1.z.string().email().optional(),
    });
    it("returns parsed data for valid input", () => {
        const data = { name: "John", age: 30, email: "john@test.com" };
        const result = (0, validate_1.validateZod)(TestSchema, data);
        expect(result).toEqual(data);
    });
    it("returns parsed data without optional field", () => {
        const data = { name: "Jane", age: 25 };
        const result = (0, validate_1.validateZod)(TestSchema, data);
        expect(result).toEqual(data);
    });
    it("throws ValidationError for missing required field", () => {
        expect(() => (0, validate_1.validateZod)(TestSchema, { age: 30 })).toThrow(errors_1.ValidationError);
    });
    it("throws ValidationError for invalid type", () => {
        expect(() => (0, validate_1.validateZod)(TestSchema, { name: "John", age: "not-a-number" })).toThrow(errors_1.ValidationError);
    });
    it("throws ValidationError for out-of-range value", () => {
        expect(() => (0, validate_1.validateZod)(TestSchema, { name: "John", age: 200 })).toThrow(errors_1.ValidationError);
    });
    it("throws ValidationError for negative age", () => {
        expect(() => (0, validate_1.validateZod)(TestSchema, { name: "John", age: -5 })).toThrow(errors_1.ValidationError);
    });
    it("throws ValidationError for empty object", () => {
        expect(() => (0, validate_1.validateZod)(TestSchema, {})).toThrow(errors_1.ValidationError);
    });
});
