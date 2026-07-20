import {
  APIError,
  ValidationError,
  AuthorizeError,
  NotFoundError,
} from "../errors";
import { STATUS_CODES } from "../status-code";

describe("Error Classes", () => {
  describe("APIError", () => {
    it('has default name "api internal server error" and status 500', () => {
      const error = new APIError();

      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(STATUS_CODES.INTERNAL_ERROR);
      expect(error.message).toBe("api error");
    });

    it("accepts custom description", () => {
      const error = new APIError("custom api error");

      expect(error.message).toBe("custom api error");
      expect(error.status).toBe(STATUS_CODES.INTERNAL_ERROR);
    });
  });

  describe("ValidationError", () => {
    it('has default name "bad request" and status 400', () => {
      const error = new ValidationError();

      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect(error.message).toBe("bad request");
    });

    it("accepts custom description", () => {
      const error = new ValidationError("name is required");

      expect(error.message).toBe("name is required");
      expect(error.status).toBe(STATUS_CODES.BAD_REQUEST);
    });
  });

  describe("AuthorizeError", () => {
    it('has default name "access denied" and status 403', () => {
      const error = new AuthorizeError();

      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(STATUS_CODES.UN_AUTHORISED);
      expect(error.message).toBe("access denied");
    });

    it("accepts custom description", () => {
      const error = new AuthorizeError("admin access required");

      expect(error.message).toBe("admin access required");
      expect(error.status).toBe(STATUS_CODES.UN_AUTHORISED);
    });
  });

  describe("NotFoundError", () => {
    it('has default status 404 and message "not found"', () => {
      const error = new NotFoundError();

      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(STATUS_CODES.NOT_FOUND);
      expect(error.message).toBe("not found");
    });

    it("accepts custom description", () => {
      const error = new NotFoundError("user not found in database");

      expect(error.message).toBe("user not found in database");
      expect(error.status).toBe(STATUS_CODES.NOT_FOUND);
    });

    it("uses description as name", () => {
      const error = new NotFoundError("resource xyz not found");

      expect(error.name).toBe("resource xyz not found");
    });
  });

  describe("Error instanceof checks", () => {
    it("ValidationError is instanceof Error", () => {
      const error = new ValidationError("test");
      expect(error instanceof Error).toBe(true);
    });

    it("AuthorizeError is instanceof Error", () => {
      const error = new AuthorizeError("test");
      expect(error instanceof Error).toBe(true);
    });

    it("AuthorizeError is not instanceof ValidationError", () => {
      const error = new AuthorizeError("test");
      expect(error instanceof ValidationError).toBe(false);
    });

    it("NotFoundError is instanceof Error", () => {
      const error = new NotFoundError("test");
      expect(error instanceof Error).toBe(true);
    });
  });
});
