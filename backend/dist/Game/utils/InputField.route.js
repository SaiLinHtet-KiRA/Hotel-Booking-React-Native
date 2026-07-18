"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InputField_controller_1 = __importDefault(require("./InputField.controller"));
const route = (0, express_1.Router)();
route.patch("/input-field/:id", InputField_controller_1.default.updateInputField);
exports.default = route;
