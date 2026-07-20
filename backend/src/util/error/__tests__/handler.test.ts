import { Request, Response } from "express";
import { HandleErrorWithLogger } from "../handler";
import {
  ValidationError,
  AuthorizeError,
  NotFoundError,
  APIError,
} from "../errors";

describe("HandleErrorWithLogger", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("handles ValidationError with 400 status", () => {
    const error = new ValidationError("invalid input");

    HandleErrorWithLogger(
      error,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "invalid input",
      data: null,
    });
  });

  it("handles AuthorizeError with 403 status", () => {
    const error = new AuthorizeError("access denied");

    HandleErrorWithLogger(
      error,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "access denied",
      data: null,
    });
  });

  it("handles NotFoundError with 404 status", () => {
    const error = new NotFoundError("resource not found");

    HandleErrorWithLogger(
      error,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "resource not found",
      data: null,
    });
  });

  it("handles unknown errors with 500 status", () => {
    const error = new Error("something went wrong");

    HandleErrorWithLogger(
      error,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "something went wrong",
      data: null,
    });
  });

  it("handles APIError with 500 status", () => {
    const error = new APIError("internal error");

    HandleErrorWithLogger(
      error,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "internal error",
      data: null,
    });
  });

  it("handles error with default message when message property is missing", () => {
    const error = {} as Error;

    HandleErrorWithLogger(
      error,
      req as Request,
      res as Response,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
