import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { getNextSequence } from "../Counter";

describe("Counter - getNextSequence", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  it("returns a number for RoomId", async () => {
    const sequence = await getNextSequence("RoomId");

    expect(typeof sequence).toBe("number");
    expect(sequence!).toBeGreaterThanOrEqual(0);
  });

  it("returns a number for UserId", async () => {
    const sequence = await getNextSequence("UserId");

    expect(typeof sequence).toBe("number");
    expect(sequence!).toBeGreaterThanOrEqual(0);
  });

  it("increments sequence on subsequent calls", async () => {
    const first = await getNextSequence("RoomId");
    const second = await getNextSequence("RoomId");

    expect(second!).toBeGreaterThan(first!);
  });

  it("maintains separate sequences for different names", async () => {
    const roomSeq = await getNextSequence("RoomId");
    const userSeq = await getNextSequence("UserId");

    expect(typeof roomSeq).toBe("number");
    expect(typeof userSeq).toBe("number");
  });
});
