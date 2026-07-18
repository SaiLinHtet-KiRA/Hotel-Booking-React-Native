"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("./User.controller"));
const CheckIsAdmin_1 = __importDefault(require("./middleware/CheckIsAdmin"));
const route = (0, express_1.Router)();
route.get("/user/:id", CheckIsAdmin_1.default, User_controller_1.default.getUser);
route.get("/user", CheckIsAdmin_1.default, User_controller_1.default.getUsers);
route.post("/user", CheckIsAdmin_1.default, User_controller_1.default.createUser);
route.patch("/user/:id", CheckIsAdmin_1.default, User_controller_1.default.updateUser);
route.delete("/user/:id", CheckIsAdmin_1.default, User_controller_1.default.deleteUser);
exports.default = route;
