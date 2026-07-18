"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVercelImage = deleteVercelImage;
const blob_1 = require("@vercel/blob");
const VERCEL_BLOB_URL_PATTERN = /\.blob\.vercel-storage\.com\//;
function isVercelBlobUrl(url) {
    return VERCEL_BLOB_URL_PATTERN.test(url);
}
async function deleteVercelImage(url) {
    if (!url || !isVercelBlobUrl(url))
        return;
    try {
        await (0, blob_1.del)(url);
    }
    catch {
    }
}
