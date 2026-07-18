"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../../util/validate");
const User_service_1 = __importDefault(require("../User.service"));
const Schema_1 = require("./interface/Schema");
class AuthService {
    async checkPasswordIsCorrect(data) {
        try {
            const { name, password } = (0, validate_1.validateZod)(Schema_1.LoginSchema, data);
            const existingUser = await User_service_1.default.getUsers({ name });
            if (existingUser.length)
                return Users;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new AuthService();
