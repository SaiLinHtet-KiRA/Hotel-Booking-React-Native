"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../util/error/errors");
const User_model_1 = __importDefault(require("./User.model"));
class UserRepo {
    async get({ limit, page, role, name, }) {
        try {
            const Users = await User_model_1.default.find(name
                ? { name }
                : role == "admin" || role == "user"
                    ? {
                        role,
                    }
                    : {}, {}, page && limit ? { skip: page * limit, limit } : {});
            if (Users)
                return Users;
            throw new Error(`Something was wrong in UserRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const User = await User_model_1.default.findById(id);
            if (User)
                return User;
            throw new errors_1.NotFoundError(`${id} was not found in User Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newUser = new User_model_1.default(data);
            return await newUser.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const User = await User_model_1.default.findByIdAndUpdate(id, data, {
                returnDocument: "after",
                runValidators: true,
            });
            if (User)
                return User;
            throw new errors_1.NotFoundError(`${id} was not found in User Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const User = await User_model_1.default.findByIdAndDelete(id);
            if (User)
                return User;
            throw new errors_1.NotFoundError(`${id} was not found in User Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new UserRepo();
