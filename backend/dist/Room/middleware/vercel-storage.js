"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blob_1 = require("@vercel/blob");
const SaveImage = async (req, _res, next) => {
    try {
        const files = req.files;
        if (!files)
            return next();
        if (files?.length) {
            const photos = await Promise.all(files?.map(async (file) => {
                const path = `room/${new Date().getTime()}`;
                const blob = await (0, blob_1.put)(path, file.buffer, {
                    access: "public",
                    addRandomSuffix: true,
                    contentType: file.mimetype,
                });
                return blob.url;
            }));
            req.body.photo = photos;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = SaveImage;
