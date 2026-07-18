"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../../util/validate");
const User_service_1 = __importDefault(require("../User.service"));
const Schema_1 = require("./interface/Schema");
const comparePassword_1 = require("../../helper/comparePassword");
const errors_1 = require("../../util/error/errors");
class AuthService {
    async checkPasswordIsCorrect(data) {
        try {
            const { name, password } = (0, validate_1.validateZod)(Schema_1.LoginSchema, data);
            const existingUser = await User_service_1.default.getUsers({ name });
            if (!existingUser.length) {
                throw new errors_1.AuthorizeError("Invalid name or password");
            }
            const isMatch = await (0, comparePassword_1.comparePassword)(password, existingUser[0].password);
            if (!isMatch) {
                throw new errors_1.AuthorizeError("Invalid name or password");
            }
            return existingUser[0]._id.toString();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new AuthService();
