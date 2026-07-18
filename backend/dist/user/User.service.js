"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../util/validate");
const User_model_1 = require("./User.model");
const User_repo_1 = __importDefault(require("./User.repo"));
class UserService {
    async getUsers(query) {
        try {
            const Users = await User_repo_1.default.get(query);
            return Users;
        }
        catch (error) {
            throw error;
        }
    }
    async getUser(id) {
        try {
            return await User_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createUser(data) {
        try {
            const UserData = (0, validate_1.validateZod)(User_model_1.UserSchema, data);
            const newUser = await User_repo_1.default.create(UserData);
            return newUser;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(id, data) {
        try {
            try {
                const UserData = (0, validate_1.validateZod)(User_model_1.UserSchema, data);
                return await User_repo_1.default.update(id, UserData);
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            return await User_repo_1.default.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new UserService();
