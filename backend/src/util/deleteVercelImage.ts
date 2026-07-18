import { del } from "@vercel/blob";

const VERCEL_BLOB_URL_PATTERN = /\.blob\.vercel-storage\.com\//;

function isVercelBlobUrl(url: string): boolean {
  return VERCEL_BLOB_URL_PATTERN.test(url);
}

export async function deleteVercelImage(url: string): Promise<void> {
  if (!url || !isVercelBlobUrl(url)) return;
  try {
    await del(url);
  } catch {
  }
}
