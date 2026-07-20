"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckAdmin_1 = __importDefault(require("../CheckAdmin"));
const User_service_1 = __importDefault(require("../../../User/User.service"));
jest.mock("../../../User/User.service");
const mockedUserService = jest.mocked(User_service_1.default);
describe("CheckAdmin Middleware", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("calls next() for admin user with id param", async () => {
        mockedUserService.getUser.mockResolvedValue({
            _id: "admin123",
            name: "admin",
            role: "admin",
            id: 1,
        });
        const req = {
            session: { userId: "admin123" },
            params: { id: "some-room-id" },
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });
    it("calls next(error) when id param is missing", async () => {
        mockedUserService.getUser.mockResolvedValue({
            _id: "admin123",
            name: "admin",
            role: "admin",
            id: 1,
        });
        const req = {
            session: { userId: "admin123" },
            params: {},
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("id is missing!!");
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
            params: { id: "some-room-id" },
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("Admin access required");
    });
    it("calls next(error) when not logged in", async () => {
        const req = {
            session: {},
            params: { id: "some-room-id" },
        };
        const res = {};
        const next = jest.fn();
        await (0, CheckAdmin_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(next.mock.calls[0][0].message).toBe("Not logged in");
    });
});
