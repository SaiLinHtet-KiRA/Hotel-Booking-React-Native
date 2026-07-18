"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_service_1 = __importDefault(require("./Game.service"));
class GameController {
    async addForm(req, res) {
        try {
            const { id } = req.params;
            const Game = await Game_service_1.default.addForm(id, req.body);
            res.status(200).json({ message: "Form added successfully", data: Game });
        }
        catch (error) {
            throw error;
        }
    }
    async getGame(req, res) {
        try {
            const { id } = req.params;
            const Game = await Game_service_1.default.getGame(id);
            res
                .status(200)
                .json({ message: "Game retrieved successfully", data: Game });
        }
        catch (error) {
            throw error;
        }
    }
    async getGames(req, res) {
        try {
            const { page, limit } = req.query;
            const Game = await Game_service_1.default.getGames({ page, limit });
            res
                .status(200)
                .json({ message: "Games fetched successfully", data: Game });
        }
        catch (error) {
            throw error;
        }
    }
    async updateGame(req, res) {
        try {
            const { id } = req.params;
            const Game = await Game_service_1.default.updateGame(id, req.body);
            res
                .status(200)
                .json({ message: "Game updated successfully", data: Game });
        }
        catch (error) {
            throw error;
        }
    }
    async createGame(req, res) {
        try {
            const Game = await Game_service_1.default.createGame(req.body);
            res
                .status(200)
                .json({ message: "Game created successfully", data: Game });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteGame(req, res) {
        try {
            const { id } = req.params;
            const Game = await Game_service_1.default.deleteGame(id);
            res
                .status(200)
                .json({ message: "Game deleted successfully", data: Game });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new GameController();
