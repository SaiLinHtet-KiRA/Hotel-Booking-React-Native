"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Booking_controller_1 = __importDefault(require("./Booking.controller"));
const route = (0, express_1.Router)();
route.get("/booking/:id", Booking_controller_1.default.getBooking);
route.post("/booking", Booking_controller_1.default.createBooking);
route.delete("/booking/:id", Booking_controller_1.default.deleteBooking);
exports.default = route;
