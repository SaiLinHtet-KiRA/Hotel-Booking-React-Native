"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Ratings_controller_1 = __importDefault(require("./Ratings.controller"));
const route = (0, express_1.Router)();
route.get("/ratings/:id", Ratings_controller_1.default.getRatings);
exports.default = route;
