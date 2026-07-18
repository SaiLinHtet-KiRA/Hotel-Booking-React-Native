export function encoder<T>(obj: T): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

export function decoder<T>(value: string): T {
  const json = Buffer.from(value, "base64").toString("utf8");
  return JSON.parse(json) as T;
}
