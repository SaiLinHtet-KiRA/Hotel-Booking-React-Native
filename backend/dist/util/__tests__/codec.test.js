"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codec_1 = require("../codec");
describe("codec", () => {
    describe("encoder", () => {
        it("encodes an object to a base64 string", () => {
            const obj = { key: "value", num: 42 };
            const encoded = (0, codec_1.encoder)(obj);
            expect(typeof encoded).toBe("string");
            expect(encoded).toBe(Buffer.from(JSON.stringify(obj)).toString("base64"));
        });
        it("encodes a string", () => {
            const encoded = (0, codec_1.encoder)("hello");
            expect(typeof encoded).toBe("string");
            expect((0, codec_1.decoder)(encoded)).toBe("hello");
        });
        it("encodes a number", () => {
            const encoded = (0, codec_1.encoder)(42);
            expect(typeof encoded).toBe("string");
            expect((0, codec_1.decoder)(encoded)).toBe(42);
        });
        it("encodes an array", () => {
            const arr = [1, 2, 3];
            const encoded = (0, codec_1.encoder)(arr);
            expect((0, codec_1.decoder)(encoded)).toEqual([1, 2, 3]);
        });
        it("encodes nested objects", () => {
            const nested = { a: { b: { c: "deep" } } };
            const encoded = (0, codec_1.encoder)(nested);
            expect((0, codec_1.decoder)(encoded)).toEqual(nested);
        });
    });
    describe("decoder", () => {
        it("decodes a base64 string back to the original object", () => {
            const obj = { key: "value", num: 42 };
            const encoded = (0, codec_1.encoder)(obj);
            const decoded = (0, codec_1.decoder)(encoded);
            expect(decoded).toEqual(obj);
        });
        it("decodes to a specific type", () => {
            const data = { name: "test", count: 10 };
            const encoded = (0, codec_1.encoder)(data);
            const decoded = (0, codec_1.decoder)(encoded);
            expect(decoded.name).toBe("test");
            expect(decoded.count).toBe(10);
        });
        it("throws on invalid base64 string", () => {
            expect(() => (0, codec_1.decoder)("!!!invalid!!!")).toThrow();
        });
        it("handles empty object", () => {
            const encoded = (0, codec_1.encoder)({});
            const decoded = (0, codec_1.decoder)(encoded);
            expect(decoded).toEqual({});
        });
    });
    describe("encoder + decoder roundtrip", () => {
        it("preserves data integrity for complex objects", () => {
            const complex = {
                string: "hello",
                number: 42,
                boolean: true,
                array: [1, "two", { three: 3 }],
                nested: { deep: { deeper: null } },
            };
            const decoded = (0, codec_1.decoder)((0, codec_1.encoder)(complex));
            expect(decoded).toEqual(complex);
        });
    });
});
