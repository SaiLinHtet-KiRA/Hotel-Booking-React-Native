"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Booking_controller_1 = __importDefault(require("./Booking.controller"));
const CheckLogin_1 = __importDefault(require("./middleware/CheckLogin"));
const CheckIsAdmin_1 = __importDefault(require("./middleware/CheckIsAdmin"));
const route = (0, express_1.Router)();
route.get("/booking/:id", Booking_controller_1.default.getBooking);
route.get("/bookings", CheckIsAdmin_1.default, Booking_controller_1.default.getBookings);
route.post("/booking", CheckLogin_1.default, Booking_controller_1.default.createBooking);
route.patch("/booking/:id", CheckLogin_1.default, CheckIsAdmin_1.default, Booking_controller_1.default.updateBooking);
route.delete("/booking/:id", CheckIsAdmin_1.default, Booking_controller_1.default.deleteBooking);
exports.default = route;
