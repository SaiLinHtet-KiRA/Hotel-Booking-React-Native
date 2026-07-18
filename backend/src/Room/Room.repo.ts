import UserModel from "../User/User.model";
import { NotFoundError } from "../util/error/errors";
import RoomModel, { RoomDocument, Room } from "./Room.model";
import { PaginationQuery } from "./interface/Room.query.type";
import RoomRepoType from "./interface/Room.repo.type";

class RoomRepo implements RoomRepoType {
  async get({ limit, page, time }: PaginationQuery): Promise<RoomDocument[]> {
    try {
      const Rooms = await RoomModel.find(
        time
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
          : {},
        {},
        page && limit ? { skip: page * limit, limit } : {},
      )
        .populate({
          path: "userId",
          model: UserModel,
        })
        .sort({ id: -1 });
      if (Rooms) return Rooms;
      throw new Error(`Something was wrong in RoomRepo.get`);
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
  async update(id: string, data: Room): Promise<RoomDocument> {
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
