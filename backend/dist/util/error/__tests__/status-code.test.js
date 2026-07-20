"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_1 = require("../status-code");
describe("STATUS_CODES", () => {
    it("has correct OK status", () => {
        expect(status_code_1.STATUS_CODES.OK).toBe(200);
    });
    it("has correct BAD_REQUEST status", () => {
        expect(status_code_1.STATUS_CODES.BAD_REQUEST).toBe(400);
    });
    it("has correct UN_AUTHORISED status", () => {
        expect(status_code_1.STATUS_CODES.UN_AUTHORISED).toBe(403);
    });
    it("has correct NOT_FOUND status", () => {
        expect(status_code_1.STATUS_CODES.NOT_FOUND).toBe(404);
    });
    it("has correct INTERNAL_ERROR status", () => {
        expect(status_code_1.STATUS_CODES.INTERNAL_ERROR).toBe(500);
    });
});
