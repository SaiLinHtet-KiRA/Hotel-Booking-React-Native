"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
async function CheckAdminOrSelf(req, _res, next) {
    try {
        if (!req.userId) {
            throw new errors_1.AuthorizeError("Not logged in");
        }
        if (req.userRole === "admin" || req.userId === req.params.id) {
            next();
            return;
        }
        throw new errors_1.AuthorizeError("Access denied");
    }
    catch (error) {
        next(error);
    }
}
exports.default = CheckAdminOrSelf;
