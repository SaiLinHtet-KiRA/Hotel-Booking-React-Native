"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PackageSection_model_1 = require("./PackageSection.model");
const Game_repo_1 = __importDefault(require("./Game.repo"));
const Form_service_1 = __importDefault(require("./utils/Form.service"));
const validate_1 = require("../util/validate");
const deleteVercelImage_1 = require("../util/deleteVercelImage");
class GameService {
    async getGames(query) {
        try {
            const Games = await Game_repo_1.default.get(query);
            return Games;
        }
        catch (error) {
            throw error;
        }
    }
    async getGame(id) {
        try {
            return await Game_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createGame(data) {
        try {
            const { form, ...gameData } = data;
            const GameData = (0, validate_1.validateZod)(PackageSection_model_1.GameSchema, gameData);
            const newGame = await Game_repo_1.default.create(GameData);
            if (form?.input_field)
                await this.addForm(newGame._id.toString(), form?.input_field);
            return newGame;
        }
        catch (error) {
            throw error;
        }
    }
    async updateGame(id, data) {
        try {
            const existingGame = await this.getGame(id);
            const GameData = (0, validate_1.validateZod)(PackageSection_model_1.GameSchema, data);
            const updatedGame = await Game_repo_1.default.update(id, GameData);
            if (GameData.icon &&
                existingGame.icon &&
                GameData.icon !== existingGame.icon) {
                await (0, deleteVercelImage_1.deleteVercelImage)(existingGame.icon);
            }
            if (GameData.background &&
                existingGame.background &&
                GameData.background !== existingGame.background) {
                await (0, deleteVercelImage_1.deleteVercelImage)(existingGame.background);
            }
            return updatedGame;
        }
        catch (error) {
            throw error;
        }
    }
    async addForm(id, data) {
        try {
            const existedGame = await this.getGame(id);
            const createdForm = await Form_service_1.default.createForm(data);
            return await this.updateGame(existedGame._id.toString(), {
                id: existedGame.id,
                name: existedGame.name,
                form: createdForm._id.toString(),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteGame(id) {
        try {
            const deletedGame = await Game_repo_1.default.delete(id);
            if (deletedGame.icon)
                await (0, deleteVercelImage_1.deleteVercelImage)(deletedGame.icon);
            if (deletedGame.background)
                await (0, deleteVercelImage_1.deleteVercelImage)(deletedGame.background);
            return deletedGame;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new GameService();
