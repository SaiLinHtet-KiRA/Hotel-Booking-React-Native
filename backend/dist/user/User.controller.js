"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("./User.service"));
class UserController {
    async getUser(req, res) {
        try {
            const { id } = req.params;
            const User = await User_service_1.default.getUser(id);
            res
                .status(200)
                .json({ message: "User retrieved successfully", data: User });
        }
        catch (error) {
            throw error;
        }
    }
    async getUsers(req, res) {
        try {
            const query = req.query;
            const User = await User_service_1.default.getUsers(query);
            res
                .status(200)
                .json({ message: "Users fetched successfully", data: User });
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const User = await User_service_1.default.updateUser(id, req.body);
            res
                .status(200)
                .json({ message: "User updated successfully", data: User });
        }
        catch (error) {
            throw error;
        }
    }
    async createUser(req, res) {
        try {
            const User = await User_service_1.default.createUser(req.body);
            res
                .status(200)
                .json({ message: "User created successfully", data: User });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const User = await User_service_1.default.deleteUser(id);
            res
                .status(200)
                .json({ message: "User deleted successfully", data: User });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new UserController();
