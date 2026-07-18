"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const User_service_1 = __importDefault(require("../../User/User.service"));
const Room_service_1 = __importDefault(require("../Room.service"));
async function CanDelete(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
req, _res, next) {
    try {
        if (!req.session.userId) {
            throw new errors_1.AuthorizeError("Not logged in");
        }
        const { id } = req.params;
        const user = await User_service_1.default.getUser(req.session.userId);
        if (!id)
            throw Error("id is missing!!");
        const existingBooking = await Room_service_1.default.getRoom(id);
        if (existingBooking.userId._id.toString() == req.session.userId)
            return next();
        if (user.role !== "admin" && user.role !== "owner") {
            throw new errors_1.AuthorizeError("Admin or owner access required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = CanDelete;
