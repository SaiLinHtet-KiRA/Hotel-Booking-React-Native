"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_service_1 = __importDefault(require("./Auth.service"));
const User_service_1 = __importDefault(require("../User.service"));
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
            req.session.userId = userId;
            res.status(200).json({ message: "Login success" });
        }
        catch (error) {
            throw error;
        }
    }
    async getProfile(req, res) {
        try {
            if (!req.session.userId) {
                res.status(401).json({
                    message: "Not logged in",
                });
                return;
            }
            const { name, role, id, _id } = await User_service_1.default.getUser(req.session.userId);
            res.json({
                message: "Logged In",
                data: { _id: String(_id), name, role: role, id },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async Logout(req, res) {
        try {
            await new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
            res.json({
                message: "Logged out",
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new AuthController();
