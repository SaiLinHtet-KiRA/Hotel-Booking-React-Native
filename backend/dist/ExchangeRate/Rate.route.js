"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Rate_controller_1 = __importDefault(require("./Rate.controller"));
const route = (0, express_1.Router)();
route.get("/rate/:id", Rate_controller_1.default.getRate);
route.get("/rate", Rate_controller_1.default.getRates);
route.post("/rate", Rate_controller_1.default.createRate);
route.patch("/rate/:id", Rate_controller_1.default.updateRate);
route.delete("/rate/:id", Rate_controller_1.default.deleteRate);
exports.default = route;
