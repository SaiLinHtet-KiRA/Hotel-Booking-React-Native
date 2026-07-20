"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../util/error/errors");
const Rating_model_1 = __importDefault(require("./Rating.model"));
class RatingRepo {
    async get() {
        try {
            const Ratings = await Rating_model_1.default.find();
            if (Ratings)
                return Ratings;
            throw new Error(`Something was wrong in RatingRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const Rating = await Rating_model_1.default.findById(id);
            if (Rating)
                return Rating;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newRating = new Rating_model_1.default(data);
            return await newRating.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Rating = await Rating_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (Rating)
                return Rating;
            throw new errors_1.NotFoundError(`${id} was not found in Rating Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Rating = await Rating_model_1.default.findByIdAndDelete(id);
            if (Rating)
                return Rating;
            throw new errors_1.NotFoundError(`${id} was not found in Rating Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RatingRepo();
