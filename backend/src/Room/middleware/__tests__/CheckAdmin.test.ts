import CheckAdmin from "../CheckAdmin";
import { Request, Response } from "express";
import UserService from "../../../User/User.service";

jest.mock("../../../User/User.service");

const mockedUserService = jest.mocked(UserService);

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
    } as never);

    const req = {
      session: { userId: "admin123" },
      params: { id: "some-room-id" },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("calls next(error) when id param is missing", async () => {
    mockedUserService.getUser.mockResolvedValue({
      _id: "admin123",
      name: "admin",
      role: "admin",
      id: 1,
    } as never);

    const req = {
      session: { userId: "admin123" },
      params: {},
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("id is missing!!");
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
      params: { id: "some-room-id" },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("Admin access required");
  });

  it("calls next(error) when not logged in", async () => {
    const req = {
      session: {},
      params: { id: "some-room-id" },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("Not logged in");
  });
});
