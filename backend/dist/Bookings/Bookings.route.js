"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Bookings_controller_1 = __importDefault(require("./Bookings.controller"));
const route = (0, express_1.Router)();
route.get("/bookings/:id", Bookings_controller_1.default.getBookings);
exports.default = route;
