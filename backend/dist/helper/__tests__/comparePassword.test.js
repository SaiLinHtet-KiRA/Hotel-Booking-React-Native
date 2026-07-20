"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const comparePassword_1 = require("../comparePassword");
describe("comparePassword", () => {
    let hashedPassword;
    beforeAll(async () => {
        const salt = await bcrypt_1.default.genSalt(10);
        hashedPassword = await bcrypt_1.default.hash("testpassword", salt);
    });
    it("returns true for matching passwords", async () => {
        const result = await (0, comparePassword_1.comparePassword)("testpassword", hashedPassword);
        expect(result).toBe(true);
    });
    it("returns false for non-matching passwords", async () => {
        const result = await (0, comparePassword_1.comparePassword)("wrongpassword", hashedPassword);
        expect(result).toBe(false);
    });
    it("returns false for empty password", async () => {
        const result = await (0, comparePassword_1.comparePassword)("", hashedPassword);
        expect(result).toBe(false);
    });
    it("works with newly hashed password", async () => {
        const salt = await bcrypt_1.default.genSalt(10);
        const newHash = await bcrypt_1.default.hash("newpassword", salt);
        const result = await (0, comparePassword_1.comparePassword)("newpassword", newHash);
        expect(result).toBe(true);
    });
});
