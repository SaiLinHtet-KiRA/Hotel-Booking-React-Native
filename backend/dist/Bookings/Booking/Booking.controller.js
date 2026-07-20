"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Booking_service_1 = __importDefault(require("./Booking.service"));
class BookingController {
    async getBooking(req, res) {
        try {
            const { id } = req.params;
            const Booking = await Booking_service_1.default.getBooking(id);
            res
                .status(200)
                .json({ message: "Booking retrieved successfully", data: Booking });
        }
        catch (error) {
            throw error;
        }
    }
    async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            const Booking = await Booking_service_1.default.updateBooking(id, body);
            res
                .status(200)
                .json({ message: "Booking retrieved successfully", data: Booking });
        }
        catch (error) {
            throw error;
        }
    }
    async createBooking(req, res) {
        try {
            const body = req.body;
            const Booking = await Booking_service_1.default.createBooking(body);
            res
                .status(200)
                .json({ message: "Booking retrieved successfully", data: Booking });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            const Booking = await Booking_service_1.default.deleteBooking(id);
            res
                .status(200)
                .json({ message: "Booking retrieved successfully", data: Booking });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new BookingController();
