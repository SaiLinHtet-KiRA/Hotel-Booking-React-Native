"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_service_1 = __importDefault(require("./Room.service"));
class RoomController {
    async getRoom(req, res) {
        try {
            const { id } = req.params;
            const Room = await Room_service_1.default.getRoom(id);
            res
                .status(200)
                .json({ message: "Room retrieved successfully", data: Room });
        }
        catch (error) {
            throw error;
        }
    }
    async getRooms(req, res) {
        try {
            const query = req.query;
            const Room = await Room_service_1.default.getRooms(query);
            res
                .status(200)
                .json({ message: "Rooms fetched successfully", data: Room });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRoom(req, res) {
        try {
            const { id } = req.params;
            const Room = await Room_service_1.default.updateRoom(id, req.body);
            res
                .status(200)
                .json({ message: "Room updated successfully", data: Room });
        }
        catch (error) {
            throw error;
        }
    }
    async createRoom(req, res) {
        try {
            const Room = await Room_service_1.default.createRoom(req.body);
            res
                .status(200)
                .json({ message: "Room created successfully", data: Room });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRoom(req, res) {
        try {
            const { id } = req.params;
            const Room = await Room_service_1.default.deleteRoom(id);
            res
                .status(200)
                .json({ message: "Room deleted successfully", data: Room });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RoomController();
