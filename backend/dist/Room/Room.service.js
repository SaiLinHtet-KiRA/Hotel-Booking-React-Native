"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_model_1 = require("./Room.model");
const Room_repo_1 = __importDefault(require("./Room.repo"));
const validate_1 = require("../util/validate");
const User_service_1 = __importDefault(require("../User/User.service"));
const DateToNumber_1 = require("../helper/DateToNumber");
class RoomService {
    async getRooms(query) {
        try {
            const Rooms = await Room_repo_1.default.get(query);
            return Rooms;
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
            if ((0, DateToNumber_1.DateToNumber)(data.endTime) - (0, DateToNumber_1.DateToNumber)(data.startTime) >
                2 * 60 * 60 * 1000)
                throw Error("Meetig time can only take two hours");
            if ((0, DateToNumber_1.DateToNumber)(data.startTime) >= (0, DateToNumber_1.DateToNumber)(data.endTime))
                throw Error("End time must be after start time");
            const existingSection = await this.getRooms({
                time: (0, DateToNumber_1.DateToNumber)(data.startTime),
            });
            console.log("existingSection", existingSection);
            if (existingSection.length)
                throw Error("This time section is alredy taken");
            const newRoom = await Room_repo_1.default.create(RoomData);
            await User_service_1.default.updateUser(newRoom.userId, {
                $push: { records: newRoom._id },
            });
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
            await User_service_1.default.updateUser(deletedRoom.userId.toString(), {
                $pull: { records: deletedRoom._id },
            });
            return deletedRoom;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RoomService();
