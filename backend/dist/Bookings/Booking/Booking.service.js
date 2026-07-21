"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Booking_model_1 = require("./Booking.model");
const Booking_repo_1 = __importDefault(require("./Booking.repo"));
const validate_1 = require("../../util/validate");
const Bookings_service_1 = __importDefault(require("../Bookings.service"));
class BookingService {
    async getBookings() {
        try {
            const Bookings = await Booking_repo_1.default.get();
            return Bookings;
        }
        catch (error) {
            throw error;
        }
    }
    async getBooking(id) {
        try {
            return await Booking_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createBooking(data) {
        try {
            const BookingData = (0, validate_1.validateZod)(Booking_model_1.BookingSchema, data);
            const newBooking = await Booking_repo_1.default.create(BookingData);
            await Bookings_service_1.default.updateBookings(newBooking.bookings, {
                $push: { bookings: newBooking._id },
                $inc: { size: 1 },
            });
            return newBooking;
        }
        catch (error) {
            throw error;
        }
    }
    async updateBooking(id, data) {
        try {
            try {
                const BookingData = (0, validate_1.validateZod)(Booking_model_1.BookingSchema, data);
                return await Booking_repo_1.default.update(id, BookingData);
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteBooking(id) {
        try {
            const deletedBooking = await Booking_repo_1.default.delete(id);
            await Bookings_service_1.default.updateBookings(deletedBooking.bookings, {
                $pull: { bookings: deletedBooking._id },
                $inc: { size: -1 },
            });
            return deletedBooking;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new BookingService();
