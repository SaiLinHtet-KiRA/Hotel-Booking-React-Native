"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Rating_controller_1 = __importDefault(require("./Rating.controller"));
const route = (0, express_1.Router)();
route.get("/rating/:id", Rating_controller_1.default.getRating);
route.post("/rating", Rating_controller_1.default.createRating);
route.patch("/rating/:id", Rating_controller_1.default.updateRating);
route.delete("/rating/:id", Rating_controller_1.default.deleteRating);
exports.default = route;
