"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bookings_service_1 = __importDefault(require("./Bookings.service"));
class BookingsController {
    async getBookings(req, res) {
        try {
            const { id } = req.params;
            const Bookings = await Bookings_service_1.default.getBooking(id);
            res
                .status(200)
                .json({ message: "Bookings retrieved successfully", data: Bookings });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new BookingsController();
