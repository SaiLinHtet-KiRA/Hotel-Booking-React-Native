import bcrypt from "bcrypt";
import { comparePassword } from "../comparePassword";

describe("comparePassword", () => {
  let hashedPassword: string;

  beforeAll(async () => {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash("testpassword", salt);
  });

  it("returns true for matching passwords", async () => {
    const result = await comparePassword("testpassword", hashedPassword);

    expect(result).toBe(true);
  });

  it("returns false for non-matching passwords", async () => {
    const result = await comparePassword("wrongpassword", hashedPassword);

    expect(result).toBe(false);
  });

  it("returns false for empty password", async () => {
    const result = await comparePassword("", hashedPassword);

    expect(result).toBe(false);
  });

  it("works with newly hashed password", async () => {
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash("newpassword", salt);

    const result = await comparePassword("newpassword", newHash);

    expect(result).toBe(true);
  });
});
