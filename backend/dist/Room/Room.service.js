"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_model_1 = require("./Room.model");
const Room_repo_1 = __importDefault(require("./Room.repo"));
const validate_1 = require("../util/validate");
class RoomService {
    async getRooms(query) {
        try {
            const data = await Room_repo_1.default.get(query);
            const size = await Room_repo_1.default.getCount(query);
            return { data, size };
        }
        catch (error) {
            throw error;
        }
    }
    async getSize(query) {
        try {
            return await Room_repo_1.default.getCount(query);
        }
        catch (error) {
            throw error;
        }
    }
    async getRoom(id) {
        try {
            return await Room_repo_1.default.getByID(id);
        }
        catch (error) {
            throw error;
        }
    }
    async createRoom(data) {
        try {
            const RoomData = (0, validate_1.validateZod)(Room_model_1.RoomSchema, data);
            const newRoom = await Room_repo_1.default.create(RoomData);
            return newRoom;
        }
        catch (error) {
            throw error;
        }
    }
    async updateRoom(id, data) {
        try {
            try {
                const RoomData = (0, validate_1.validateZod)(Room_model_1.RoomSchema, data);
                return await Room_repo_1.default.update(id, RoomData);
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRoom(id) {
        try {
            const deletedRoom = await Room_repo_1.default.delete(id);
            return deletedRoom;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RoomService();
