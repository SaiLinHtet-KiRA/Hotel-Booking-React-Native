"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rate_service_1 = __importDefault(require("./Rate.service"));
class RateController {
    async getRate(req, res) {
        try {
            const { id } = req.params;
            const Rate = await Rate_service_1.default.getRate(id);
            res
                .status(200)
                .json({ message: "Rate retrieved successfully", data: Rate });
        }
        catch (error) {
            throw error;
        }
    }
    async getRates(_req, res) {
        try {
            const Rate = await Rate_service_1.default.getRates();
            res
                .status(200)
                .json({ message: "Rates fetched successfully", data: Rate });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRate(req, res) {
        try {
            const { id } = req.params;
            const Rate = await Rate_service_1.default.updateRate(id, req.body);
            res
                .status(200)
                .json({ message: "Rate updated successfully", data: Rate });
        }
        catch (error) {
            throw error;
        }
    }
    async createRate(req, res) {
        try {
            const Rate = await Rate_service_1.default.createRate(req.body);
            res
                .status(200)
                .json({ message: "Rate created successfully", data: Rate });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRate(req, res) {
        try {
            const { id } = req.params;
            const Rate = await Rate_service_1.default.deleteRate(id);
            res
                .status(200)
                .json({ message: "Rate deleted successfully", data: Rate });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RateController();
