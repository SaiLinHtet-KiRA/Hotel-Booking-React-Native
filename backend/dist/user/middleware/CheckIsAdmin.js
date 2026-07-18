"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const User_service_1 = __importDefault(require("../User.service"));
async function CheckIsAdmin(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
req, _res, next) {
    try {
        if (!req.session.userId) {
            throw new errors_1.AuthorizeError("Not logged in");
        }
        const user = await User_service_1.default.getUser(req.session.userId);
        if (user.role !== "admin") {
            throw new errors_1.AuthorizeError("Admin access required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = CheckIsAdmin;
