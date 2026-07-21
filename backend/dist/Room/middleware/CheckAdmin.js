"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
async function CheckAdmin(req, _res, next) {
    try {
        if (!req.userId) {
            throw new errors_1.AuthorizeError("Not logged in");
        }
        if (req.userRole !== "admin") {
            throw new errors_1.AuthorizeError("Admin access required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = CheckAdmin;
