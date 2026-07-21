"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_controller_1 = __importDefault(require("./Auth.controller"));
const route = (0, express_1.Router)();
route.post("/auth/signup", Auth_controller_1.default.SingUp);
route.post("/auth/login", Auth_controller_1.default.Login);
route.get("/auth/profile", Auth_controller_1.default.getProfile);
route.post("/auth/logout", Auth_controller_1.default.Logout);
exports.default = route;
