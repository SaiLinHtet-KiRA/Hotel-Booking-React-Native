"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Game_controller_1 = __importDefault(require("./Game.controller"));
const multer_1 = __importDefault(require("./util/multer"));
const vercel_storage_1 = __importDefault(require("./middleware/vercel-storage"));
const route = (0, express_1.Router)();
const imageFields = [
    { name: "icon", maxCount: 1 },
    { name: "background", maxCount: 1 },
];
route.get("/games", Game_controller_1.default.getGames);
route.get("/game/:id", Game_controller_1.default.getGame);
route.post("/game", multer_1.default.fields(imageFields), vercel_storage_1.default, Game_controller_1.default.createGame);
route.put("/game/:id", multer_1.default.fields(imageFields), vercel_storage_1.default, Game_controller_1.default.updateGame);
route.patch("/game/addform/:id", Game_controller_1.default.addForm);
route.delete("/game/:id", Game_controller_1.default.deleteGame);
exports.default = route;
