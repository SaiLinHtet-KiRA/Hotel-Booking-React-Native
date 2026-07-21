"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rating_model_1 = require("./Rating.model");
const Rating_repo_1 = __importDefault(require("./Rating.repo"));
const validate_1 = require("../../util/validate");
const Ratings_service_1 = __importDefault(require("../Ratings.service"));
class RatingService {
    async getRatings() {
        try {
            const Ratings = await Rating_repo_1.default.get();
            return Ratings;
        }
        catch (error) {
            throw error;
        }
    }
    async getRating(id) {
        try {
            return await Rating_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createRating(data) {
        try {
            const RatingData = (0, validate_1.validateZod)(Rating_model_1.RatingSchema, data);
            const newRating = await Rating_repo_1.default.create(RatingData);
            await Ratings_service_1.default.updateRatings(newRating.RatingsId, {
                $push: { ratings: newRating._id },
                $inc: { size: 1 },
            });
            return newRating;
        }
        catch (error) {
            throw error;
        }
    }
    async updateRating(id, data) {
        try {
            const RatingData = (0, validate_1.validateZod)(Rating_model_1.RatingSchema, data);
            return await Rating_repo_1.default.update(id, RatingData);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRating(id) {
        try {
            const deletedRating = await Rating_repo_1.default.delete(id);
            await Ratings_service_1.default.updateRatings(deletedRating.RatingsId, {
                $pull: { ratings: deletedRating._id },
                $inc: { size: -1 },
            });
            return deletedRating;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RatingService();
