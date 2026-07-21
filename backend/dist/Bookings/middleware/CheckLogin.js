"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const User_service_1 = __importDefault(require("../../User/User.service"));
async function CheckLogin(req, _res, next) {
    try {
        if (!req.userId) {
            throw new errors_1.AuthorizeError("Not logged in");
        }
        const user = await User_service_1.default.getUser(req.userId);
        req.params.id = user.bookings.toString();
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = CheckLogin;
