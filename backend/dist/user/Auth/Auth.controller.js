"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_service_1 = __importDefault(require("./Auth.service"));
const User_service_1 = __importDefault(require("../User.service"));
const jwt_1 = require("../../util/jwt");
const errors_1 = require("../../util/error/errors");
class AuthController {
    async SingUp(req, res) {
        try {
            await User_service_1.default.createUser(req.body);
            res.status(200).json({ message: "Account was successfully created" });
        }
        catch (error) {
            throw error;
        }
    }
    async Login(req, res) {
        try {
            const userId = await Auth_service_1.default.checkPasswordIsCorrect(req.body);
            const user = await User_service_1.default.getUser(userId);
            if (user.banned) {
                throw new errors_1.AuthorizeError("Account has been banned");
            }
            const token = (0, jwt_1.signToken)({ userId, role: user.role || "user", banned: user.banned });
            res.status(200).json({
                message: "Login success",
                token,
                data: { _id: String(user._id), name: user.name, email: user.email, role: user.role || "user" },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getProfile(req, res) {
        try {
            if (!req.userId) {
                res.status(401).json({ message: "Not logged in" });
                return;
            }
            const { name, role, id, _id, email } = await User_service_1.default.getUser(req.userId);
            res.json({
                message: "Logged In",
                data: { _id: String(_id), name, role: role, id, email },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async Logout(_req, res) {
        try {
            res.json({ message: "Logged out" });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new AuthController();
