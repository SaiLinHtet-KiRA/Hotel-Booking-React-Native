"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blob_1 = require("@vercel/blob");
const SaveImage = async (req, _res, next) => {
    try {
        const files = req.files;
        if (files?.photo?.[0]) {
            const path = `room/${new Date().getTime()}`;
            const blob = await (0, blob_1.put)(path, files.icon[0].buffer, {
                access: "public",
                addRandomSuffix: true,
                contentType: files.icon[0].mimetype,
            });
            req.body.icon = blob.url;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = SaveImage;
