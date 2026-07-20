"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAdmin = createDefaultAdmin;
const config_1 = require("../config/config");
const User_service_1 = __importDefault(require("../User/User.service"));
async function createDefaultAdmin() {
    try {
        const existingDefaultAdmin = await User_service_1.default.getUsers({
            name: config_1.ADMIN_NAME,
        });
        if (existingDefaultAdmin.length) {
            return;
        }
        await User_service_1.default.createUser({
            name: config_1.ADMIN_NAME,
            email: config_1.ADMIN_NAME,
            password: config_1.ADMIN_PASSWORD,
            role: "admin",
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
