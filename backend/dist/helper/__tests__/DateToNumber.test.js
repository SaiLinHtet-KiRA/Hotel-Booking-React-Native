"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateToNumber_1 = require("../DateToNumber");
describe("DateToNumber", () => {
    it("converts a Date to epoch milliseconds", () => {
        const date = new Date("2025-01-01T00:00:00Z");
        const result = (0, DateToNumber_1.DateToNumber)(date);
        expect(typeof result).toBe("number");
        expect(result).toBe(date.getTime());
    });
    it("handles Date object passed in another timezone", () => {
        const date = new Date("2025-06-15T12:30:00+05:30");
        const result = (0, DateToNumber_1.DateToNumber)(date);
        expect(result).toBe(date.getTime());
    });
    it("returns NaN for invalid date string", () => {
        const result = (0, DateToNumber_1.DateToNumber)(new Date("invalid-date"));
        expect(result).toBeNaN();
    });
    it("returns a number for a past date", () => {
        const date = new Date("2020-01-01T00:00:00Z");
        const result = (0, DateToNumber_1.DateToNumber)(date);
        expect(typeof result).toBe("number");
        expect(result).toBeLessThan(Date.now());
    });
});
