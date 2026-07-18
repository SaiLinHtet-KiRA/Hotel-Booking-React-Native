"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Form_controller_1 = __importDefault(require("./Form.controller"));
const route = (0, express_1.Router)();
route.get("/form/:id", Form_controller_1.default.getForm);
route.delete("/remove-input-field/:form_id/:inputField_id", Form_controller_1.default.removeInputField);
route.patch("/add-input-field/:id", Form_controller_1.default.addInputField);
route.delete("/form/:game_id/:form_id", Form_controller_1.default.deleteForm);
exports.default = route;
