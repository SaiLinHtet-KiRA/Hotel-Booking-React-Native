import { RoomDocument, Room, RoomSchema } from "./Room.model";
import RoomRepo from "./Room.repo";
import RoomServiceType from "./interface/Room.service.type";
import { validateZod } from "../util/validate";
import { PaginationQuery } from "./interface/Room.query.type";
import UserService from "../User/User.service";
import { DateToNumber } from "../helper/DateToNumber";

class RoomService implements RoomServiceType {
  async getRooms(query: PaginationQuery): Promise<RoomDocument[]> {
    try {
      const Rooms = await RoomRepo.get(query);
      return Rooms;
    } catch (error) {
      throw error;
    }
  }
  async getRoom(id: string): Promise<RoomDocument> {
    try {
      return await RoomRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }
  async createRoom(data: Room): Promise<RoomDocument> {
    try {
      const RoomData = validateZod(RoomSchema, data);

      if (
        DateToNumber(data.endTime) - DateToNumber(data.startTime) >
        2 * 60 * 60 * 1000
      )
        throw Error("Meetig time can only take two hours");

      if (DateToNumber(data.startTime) >= DateToNumber(data.endTime))
        throw Error("End time must be after start time");

      const existingSection = await this.getRooms({
        time: DateToNumber(data.startTime),
      });

      console.log("existingSection", existingSection);

      if (existingSection.length)
        throw Error("This time section is alredy taken");

      const newRoom = await RoomRepo.create(RoomData);
      await UserService.updateUser(newRoom.userId, {
        $push: { records: newRoom._id },
      });
      return newRoom;
    } catch (error) {
      throw error;
    }
  }
  async updateRoom(id: string, data: Room): Promise<RoomDocument> {
    try {
      try {
        const RoomData = validateZod(RoomSchema, data);

        return await RoomRepo.update(id, RoomData);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteRoom(id: string): Promise<RoomDocument> {
    try {
      const deletedRoom = await RoomRepo.delete(id);
      await UserService.updateUser(deletedRoom.userId.toString(), {
        $pull: { records: deletedRoom._id },
      });
      return deletedRoom;
    } catch (error) {
      throw error;
    }
  }
}

export default new RoomService();
