"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Room_controller_1 = __importDefault(require("./Room.controller"));
const route = (0, express_1.Router)();
route.get("/room/:id", Room_controller_1.default.getRoom);
route.get("/room", Room_controller_1.default.getRooms);
route.post("/room", Room_controller_1.default.createRoom);
route.patch("/room/:id", Room_controller_1.default.updateRoom);
route.delete("/room/:id", Room_controller_1.default.deleteRoom);
exports.default = route;
