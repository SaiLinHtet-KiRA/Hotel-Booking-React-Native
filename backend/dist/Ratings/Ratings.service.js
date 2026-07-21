"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ratings_model_1 = require("./Ratings.model");
const Ratings_repo_1 = __importDefault(require("./Ratings.repo"));
const validate_1 = require("../util/validate");
class RatingsService {
    async getRatings() {
        try {
            const Ratingss = await Ratings_repo_1.default.get();
            return Ratingss;
        }
        catch (error) {
            throw error;
        }
    }
    async getRating(id) {
        try {
            return await Ratings_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async calculateAverageRating(id) {
        try {
            const { ratings } = await this.getRating(id);
            return ratings.length === 0
                ? 0
                : ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
        }
        catch (error) {
            throw error;
        }
    }
    async createRatings(data) {
        try {
            const RatingsData = (0, validate_1.validateZod)(Ratings_model_1.RatingsSchema, data);
            const newRatings = await Ratings_repo_1.default.create(RatingsData);
            return newRatings;
        }
        catch (error) {
            throw error;
        }
    }
    async updateRatings(id, data) {
        try {
            const RatingsData = (0, validate_1.validateZod)(Ratings_model_1.RatingsSchema, data);
            return await Ratings_repo_1.default.update(id, RatingsData);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRatings(id) {
        try {
            return await Ratings_repo_1.default.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RatingsService();
