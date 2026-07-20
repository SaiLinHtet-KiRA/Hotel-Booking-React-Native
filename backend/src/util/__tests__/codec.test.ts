import { encoder, decoder } from "../codec";

describe("codec", () => {
  describe("encoder", () => {
    it("encodes an object to a base64 string", () => {
      const obj = { key: "value", num: 42 };
      const encoded = encoder(obj);

      expect(typeof encoded).toBe("string");
      expect(encoded).toBe(
        Buffer.from(JSON.stringify(obj)).toString("base64"),
      );
    });

    it("encodes a string", () => {
      const encoded = encoder("hello");

      expect(typeof encoded).toBe("string");
      expect(decoder(encoded)).toBe("hello");
    });

    it("encodes a number", () => {
      const encoded = encoder(42);

      expect(typeof encoded).toBe("string");
      expect(decoder(encoded)).toBe(42);
    });

    it("encodes an array", () => {
      const arr = [1, 2, 3];
      const encoded = encoder(arr);

      expect(decoder(encoded)).toEqual([1, 2, 3]);
    });

    it("encodes nested objects", () => {
      const nested = { a: { b: { c: "deep" } } };
      const encoded = encoder(nested);

      expect(decoder(encoded)).toEqual(nested);
    });
  });

  describe("decoder", () => {
    it("decodes a base64 string back to the original object", () => {
      const obj = { key: "value", num: 42 };
      const encoded = encoder(obj);
      const decoded = decoder<typeof obj>(encoded);

      expect(decoded).toEqual(obj);
    });

    it("decodes to a specific type", () => {
      interface TestType {
        name: string;
        count: number;
      }

      const data: TestType = { name: "test", count: 10 };
      const encoded = encoder(data);
      const decoded = decoder<TestType>(encoded);

      expect(decoded.name).toBe("test");
      expect(decoded.count).toBe(10);
    });

    it("throws on invalid base64 string", () => {
      expect(() => decoder("!!!invalid!!!")).toThrow();
    });

    it("handles empty object", () => {
      const encoded = encoder({});
      const decoded = decoder(encoded);

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

      const decoded = decoder<typeof complex>(encoder(complex));

      expect(decoded).toEqual(complex);
    });
  });
});
