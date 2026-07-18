"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../util/error/errors");
const Rate_model_1 = __importDefault(require("./Rate.model"));
class RateRepo {
    async get() {
        try {
            const Rates = await Rate_model_1.default.find();
            if (Rates)
                return Rates;
            throw new Error(`Something was wrong in RateRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const Rate = await Rate_model_1.default.findById(id);
            if (Rate)
                return Rate;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newRate = new Rate_model_1.default(data);
            return await newRate.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Rate = await Rate_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (Rate)
                return Rate;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Rate = await Rate_model_1.default.findByIdAndDelete(id);
            if (Rate)
                return Rate;
            throw new errors_1.NotFoundError(`${id} was not found in Rate Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RateRepo();
