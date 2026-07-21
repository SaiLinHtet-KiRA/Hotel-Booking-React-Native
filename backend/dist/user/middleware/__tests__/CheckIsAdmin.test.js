"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckIsAdmin_1 = __importDefault(require("../CheckIsAdmin"));
describe("CheckIsAdmin Middleware", () => {
    it("calls next() for admin user", async () => {
        const req = { userId: "admin123", userRole: "admin" };
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });
    it("calls next(error) for non-admin user", async () => {
        const req = { userId: "user123", userRole: "user" };
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("Admin access required");
    });
    it("calls next(error) when not logged in", async () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("Not logged in");
    });
});
