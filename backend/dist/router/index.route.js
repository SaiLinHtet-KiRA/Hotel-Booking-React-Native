"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_route_1 = __importDefault(require("../User/User.route"));
const Auth_route_1 = __importDefault(require("../User/Auth/Auth.route"));
const Room_route_1 = __importDefault(require("../Room/Room.route"));
const Bookings_route_1 = __importDefault(require("../Bookings/Bookings.route"));
const Booking_route_1 = __importDefault(require("../Bookings/Booking/Booking.route"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.json("all good").status(200);
});
router.use(User_route_1.default);
router.use(Room_route_1.default);
router.use(Auth_route_1.default);
router.use(Bookings_route_1.default);
router.use(Booking_route_1.default);
exports.default = router;
