"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ratings_service_1 = __importDefault(require("./Ratings.service"));
class RatingsController {
    async getRatings(req, res) {
        try {
            const { id } = req.params;
            const Ratings = await Ratings_service_1.default.getRating(id);
            res
                .status(200)
                .json({ message: "Ratings retrieved successfully", data: Ratings });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RatingsController();
