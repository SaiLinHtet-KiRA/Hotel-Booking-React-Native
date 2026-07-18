"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blob_1 = require("@vercel/blob");
const SaveImage = async (req, _res, next) => {
    try {
        const files = req.files;
        if (files?.icon?.[0]) {
            const path = `game/icon/${new Date().getTime()}`;
            const blob = await (0, blob_1.put)(path, files.icon[0].buffer, {
                access: "public",
                addRandomSuffix: true,
                contentType: files.icon[0].mimetype,
            });
            req.body.icon = blob.url;
        }
        if (files?.background?.[0]) {
            const path = `game/background/${new Date().getTime()}`;
            const blob = await (0, blob_1.put)(path, files.background[0].buffer, {
                access: "public",
                addRandomSuffix: true,
                contentType: files.background[0].mimetype,
            });
            req.body.background = blob.url;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = SaveImage;
