"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const Booking_model_1 = __importDefault(require("./Booking.model"));
class BookingRepo {
    async get({ limit, page, status, }) {
        try {
            const Bookings = await Booking_model_1.default.find(status ? { status: status } : {}, {}, page && limit ? { skip: page * limit, limit } : {}).sort({ createdAt: -1 });
            if (Bookings)
                return Bookings;
            throw new Error(`Something was wrong in BookingRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getCount({ status }) {
        try {
            return await Booking_model_1.default.countDocuments(status ? { status: status } : {}, {});
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const Booking = await Booking_model_1.default.findById(id);
            if (Booking)
                return Booking;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newBooking = new Booking_model_1.default(data);
            return await newBooking.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Booking = await Booking_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (Booking)
                return Booking;
            throw new errors_1.NotFoundError(`${id} was not found in Booking Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Booking = await Booking_model_1.default.findByIdAndDelete(id);
            if (Booking)
                return Booking;
            throw new errors_1.NotFoundError(`${id} was not found in Booking Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new BookingRepo();
