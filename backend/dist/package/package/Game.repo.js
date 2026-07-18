"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../util/error/errors");
const Package_model_1 = __importDefault(require("./Package.model"));
class GameRepo {
    async get({ page, limit, }) {
        try {
            const Games = await Package_model_1.default.find({}, {}, page && limit ? { skip: page * limit, limit } : {});
            if (Games)
                return Games;
            throw new Error(`Something was wrong in GameRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const game = await Package_model_1.default.findById(id);
            if (game)
                return game;
            throw new errors_1.NotFoundError(`${id} was not found in Game Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newGame = new Package_model_1.default(data);
            return await newGame.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Game = await Package_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (Game)
                return Game;
            throw new errors_1.NotFoundError(`${id} was not found in Game Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Game = await Package_model_1.default.findByIdAndDelete(id);
            if (!Game)
                throw new errors_1.NotFoundError(`${id} was not found in Game Database!!!`);
            return Game;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new GameRepo();
