"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rate_model_1 = require("./Rate.model");
const Rate_repo_1 = __importDefault(require("./Rate.repo"));
const validate_1 = require("../util/validate");
class RateService {
    async getRates() {
        try {
            const Rates = await Rate_repo_1.default.get();
            return Rates;
        }
        catch (error) {
            throw error;
        }
    }
    async getRate(id) {
        try {
            return await Rate_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createRate(data) {
        try {
            const RateData = (0, validate_1.validateZod)(Rate_model_1.RateSchema, data);
            const newRate = await Rate_repo_1.default.create(RateData);
            return newRate;
        }
        catch (error) {
            throw error;
        }
    }
    async updateRate(id, data) {
        try {
            try {
                const RateData = (0, validate_1.validateZod)(Rate_model_1.RateSchema, data);
                return await Rate_repo_1.default.update(id, RateData);
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRate(id) {
        try {
            return await Rate_repo_1.default.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RateService();
