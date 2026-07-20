import CheckIsAdmin from "../CheckIsAdmin";
import { Request, Response } from "express";
import UserService from "../../User.service";

jest.mock("../../User.service");

const mockedUserService = jest.mocked(UserService);

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
    } as never);

    const req = {
      session: { userId: "admin123" },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckIsAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("calls next(error) for non-admin user", async () => {
    mockedUserService.getUser.mockResolvedValue({
      _id: "user123",
      name: "user",
      role: "user",
      id: 2,
    } as never);

    const req = {
      session: { userId: "user123" },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckIsAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("Admin access required");
  });

  it("calls next(error) when not logged in", async () => {
    const req = {
      session: {},
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckIsAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("Not logged in");
  });

  it("calls next(error) when session is undefined", async () => {
    const req = {} as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckIsAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
  });
});
