"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../User/User.model"));
const errors_1 = require("../util/error/errors");
const Rating_model_1 = __importDefault(require("./Rating/Rating.model"));
const Ratings_model_1 = __importDefault(require("./Ratings.model"));
class RatingsRepo {
    async get() {
        try {
            const Ratingss = await Ratings_model_1.default.find();
            if (Ratingss)
                return Ratingss;
            throw new Error(`Something was wrong in RatingsRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const Ratings = await Ratings_model_1.default.findById(id).populate({
                path: "ratings",
                model: Rating_model_1.default,
                populate: { path: "user", model: User_model_1.default },
            });
            if (Ratings)
                return Ratings;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newRatings = new Ratings_model_1.default(data);
            return await newRatings.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Ratings = await Ratings_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (Ratings)
                return Ratings;
            throw new errors_1.NotFoundError(`${id} was not found in Ratings Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Ratings = await Ratings_model_1.default.findByIdAndDelete(id);
            if (Ratings)
                return Ratings;
            throw new errors_1.NotFoundError(`${id} was not found in Ratings Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RatingsRepo();
