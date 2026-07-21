import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import RoomModel, { RoomDocument, Room } from "./Room.model";
import { PaginationQuery } from "./interface/Room.query.type";
import RoomRepoType from "./interface/Room.repo.type";

class RoomRepo implements RoomRepoType {
  async get({
    limit,
    page,
    type,
    status,
  }: PaginationQuery): Promise<RoomDocument[]> {
    try {
      const Rooms = await RoomModel.find(
        type && status
          ? {
              type: type,
              status: status,
            }
          : type
            ? { type: type }
            : status
              ? { status: status }
              : {},
        {},
        page && limit ? { skip: page * limit, limit } : {},
      ).sort({ createdAt: -1 });
      if (Rooms) return Rooms;
      throw new Error(`Something was wrong in RoomRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getCount({ type, status }: PaginationQuery): Promise<number> {
    try {
      return await RoomModel.countDocuments(
        type && status
          ? {
              type: type,
              status: status,
            }
          : type
            ? { type: type }
            : status
              ? { status: status }
              : {},
        {},
      );
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<RoomDocument> {
    try {
      const Room = await RoomModel.findById(id);
      if (Room) return Room;
      throw new NotFoundError(`${id} was not found in Room Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Room): Promise<RoomDocument> {
    try {
      const newRoom = new RoomModel(data);
      return await newRoom.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: UpdateQuery<Room>): Promise<RoomDocument> {
    try {
      const Room = await RoomModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (Room) return Room;
      throw new NotFoundError(`${id} was not found in Room Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<RoomDocument> {
    try {
      const Room = await RoomModel.findByIdAndDelete(id);
      if (Room) return Room;
      throw new NotFoundError(`${id} was not found in Room Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new RoomRepo();
