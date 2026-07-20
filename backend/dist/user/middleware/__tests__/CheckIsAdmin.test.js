"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckIsAdmin_1 = __importDefault(require("../CheckIsAdmin"));
const User_service_1 = __importDefault(require("../../User.service"));
jest.mock("../../User.service");
const mockedUserService = jest.mocked(User_service_1.default);
describe("CheckIsAdmin Middleware", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("calls next() for admin user", async () => {
        mockedUserService.getUser.mockResolvedValue({
            _id: "admin123",
            name: "admin",
            role: "admin",
            id: 1,
        });
        const req = {
            session: { userId: "admin123" },
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });
    it("calls next(error) for non-admin user", async () => {
        mockedUserService.getUser.mockResolvedValue({
            _id: "user123",
            name: "user",
            role: "user",
            id: 2,
        });
        const req = {
            session: { userId: "user123" },
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("Admin access required");
    });
    it("calls next(error) when not logged in", async () => {
        const req = {
            session: {},
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("Not logged in");
    });
    it("calls next(error) when session is undefined", async () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        await (0, CheckIsAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    });
});
