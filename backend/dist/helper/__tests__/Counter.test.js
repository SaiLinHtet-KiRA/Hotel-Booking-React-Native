"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDBConfigTest_1 = require("../../util/mongoDBConfigTest");
const Counter_1 = require("../Counter");
describe("Counter - getNextSequence", () => {
    beforeAll(async () => {
        await (0, mongoDBConfigTest_1.dbConnect)();
    });
    afterAll(async () => {
        await (0, mongoDBConfigTest_1.dbDisconnect)();
    });
    it("returns a number for RoomId", async () => {
        const sequence = await (0, Counter_1.getNextSequence)("RoomId");
        expect(typeof sequence).toBe("number");
        expect(sequence).toBeGreaterThanOrEqual(0);
    });
    it("returns a number for UserId", async () => {
        const sequence = await (0, Counter_1.getNextSequence)("UserId");
        expect(typeof sequence).toBe("number");
        expect(sequence).toBeGreaterThanOrEqual(0);
    });
    it("increments sequence on subsequent calls", async () => {
        const first = await (0, Counter_1.getNextSequence)("RoomId");
        const second = await (0, Counter_1.getNextSequence)("RoomId");
        expect(second).toBeGreaterThan(first);
    });
    it("maintains separate sequences for different names", async () => {
        const roomSeq = await (0, Counter_1.getNextSequence)("RoomId");
        const userSeq = await (0, Counter_1.getNextSequence)("UserId");
        expect(typeof roomSeq).toBe("number");
        expect(typeof userSeq).toBe("number");
    });
});
