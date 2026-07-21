"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bookings_model_1 = require("./Bookings.model");
const Bookings_repo_1 = __importDefault(require("./Bookings.repo"));
const validate_1 = require("../util/validate");
class BookingsService {
    async getBookings() {
        try {
            const Bookingss = await Bookings_repo_1.default.get();
            return Bookingss;
        }
        catch (error) {
            throw error;
        }
    }
    async getBooking(id) {
        try {
            return await Bookings_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createBookings(data) {
        try {
            const BookingsData = (0, validate_1.validateZod)(Bookings_model_1.BookingsSchema, data);
            const newBookings = await Bookings_repo_1.default.create(BookingsData);
            return newBookings;
        }
        catch (error) {
            throw error;
        }
    }
    async updateBookings(id, data) {
        try {
            return await Bookings_repo_1.default.update(id, data);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteBookings(id) {
        try {
            return await Bookings_repo_1.default.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new BookingsService();
