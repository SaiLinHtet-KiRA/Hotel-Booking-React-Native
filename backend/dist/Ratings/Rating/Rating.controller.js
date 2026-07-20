"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rating_service_1 = __importDefault(require("./Rating.service"));
class RatingController {
    async getRating(req, res) {
        try {
            const { id } = req.params;
            const Rating = await Rating_service_1.default.getRating(id);
            res
                .status(200)
                .json({ message: "Rating retrieved successfully", data: Rating });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRating(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            const Rating = await Rating_service_1.default.updateRating(id, body);
            res
                .status(200)
                .json({ message: "Rating retrieved successfully", data: Rating });
        }
        catch (error) {
            throw error;
        }
    }
    async createRating(req, res) {
        try {
            const body = req.body;
            const Rating = await Rating_service_1.default.createRating(body);
            res
                .status(200)
                .json({ message: "Rating retrieved successfully", data: Rating });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRating(req, res) {
        try {
            const { id } = req.params;
            const Rating = await Rating_service_1.default.deleteRating(id);
            res
                .status(200)
                .json({ message: "Rating retrieved successfully", data: Rating });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RatingController();
