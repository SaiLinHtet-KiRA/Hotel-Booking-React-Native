import { STATUS_CODES } from "../status-code";

describe("STATUS_CODES", () => {
  it("has correct OK status", () => {
    expect(STATUS_CODES.OK).toBe(200);
  });

  it("has correct BAD_REQUEST status", () => {
    expect(STATUS_CODES.BAD_REQUEST).toBe(400);
  });

  it("has correct UN_AUTHORISED status", () => {
    expect(STATUS_CODES.UN_AUTHORISED).toBe(403);
  });

  it("has correct NOT_FOUND status", () => {
    expect(STATUS_CODES.NOT_FOUND).toBe(404);
  });

  it("has correct INTERNAL_ERROR status", () => {
    expect(STATUS_CODES.INTERNAL_ERROR).toBe(500);
  });
});
