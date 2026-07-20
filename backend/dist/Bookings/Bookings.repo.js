"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../User/User.model"));
const errors_1 = require("../util/error/errors");
const Booking_model_1 = __importDefault(require("./Booking/Booking.model"));
const Bookings_model_1 = __importDefault(require("./Bookings.model"));
class BookingsRepo {
    async get() {
        try {
            const Bookings = await Bookings_model_1.default.find();
            if (Bookings)
                return Bookings;
            throw new Error(`Something was wrong in BookingsRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const Bookings = await Bookings_model_1.default.findById(id).populate({
                path: "Bookings",
                model: Booking_model_1.default,
                populate: { path: "user", model: User_model_1.default },
            });
            if (Bookings)
                return Bookings;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newBookings = new Bookings_model_1.default(data);
            return await newBookings.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Bookings = await Bookings_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (Bookings)
                return Bookings;
            throw new errors_1.NotFoundError(`${id} was not found in Bookings Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Bookings = await Bookings_model_1.default.findByIdAndDelete(id);
            if (Bookings)
                return Bookings;
            throw new errors_1.NotFoundError(`${id} was not found in Bookings Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new BookingsRepo();
