"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const jwt_1 = require("../../util/jwt");
function authMiddleware(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new errors_1.AuthorizeError("Not logged in");
        }
        const token = authHeader.split(" ")[1];
        const payload = (0, jwt_1.verifyToken)(token);
        req.userId = payload.userId;
        req.userRole = payload.role;
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = authMiddleware;
