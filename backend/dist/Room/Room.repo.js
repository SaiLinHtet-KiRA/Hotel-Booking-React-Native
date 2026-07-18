"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../util/error/errors");
const Room_model_1 = __importDefault(require("./Room.model"));
class RoomRepo {
    async get({ limit, page, time, sort, }) {
        try {
            const Rooms = await Room_model_1.default.find(time
                ? {
                    $or: [
                        {
                            startTime: { $gte: new Date(Number(time)) },
                            endTime: { $lte: new Date(Number(time)) },
                        },
                        {
                            endTime: { $gte: new Date(Number(time)) },
                            startTime: { $lte: new Date(Number(time)) },
                        },
                    ],
                }
                : {}, {}, page && limit
                ? { skip: page * limit, limit }
                : sort
                    ? { sort: { [sort]: 1 } }
                    : {});
            if (Rooms)
                return Rooms;
            throw new Error(`Something was wrong in RoomRepo.get`);
        }
        catch (error) {
            throw error;
        }
    }
    async getByID(id) {
        try {
            const Room = await Room_model_1.default.findById(id);
            if (Room)
                return Room;
            throw new errors_1.NotFoundError(`${id} was not found in Room Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const newRoom = new Room_model_1.default(data);
            return await newRoom.save();
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const Room = await Room_model_1.default.findByIdAndUpdate(id, data, {
                returnDocument: "after",
                runValidators: true,
            });
            if (Room)
                return Room;
            throw new errors_1.NotFoundError(`${id} was not found in Room Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const Room = await Room_model_1.default.findByIdAndDelete(id);
            if (Room)
                return Room;
            throw new errors_1.NotFoundError(`${id} was not found in Room Database!!!`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new RoomRepo();
