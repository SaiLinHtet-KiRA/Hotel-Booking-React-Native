import { RoomDocument, Room, RoomSchema } from "./Room.model";
import RoomRepo from "./Room.repo";
import RoomServiceType from "./interface/Room.service.type";
import { validateZod } from "../util/validate";
import { PaginationQuery } from "./interface/Room.query.type";
import { UpdateQuery } from "mongoose";

class RoomService implements RoomServiceType {
  async getRooms(
    query: PaginationQuery,
  ): Promise<{ data: RoomDocument[]; size: number }> {
    try {
      const data = await RoomRepo.get(query);
      const size = await RoomRepo.getCount(query);

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(query: PaginationQuery): Promise<number> {
    try {
      return await RoomRepo.getCount(query);
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

      const newRoom = await RoomRepo.create(RoomData);

      return newRoom;
    } catch (error) {
      throw error;
    }
  }
  async updateRoom(id: string, data: UpdateQuery<Room>): Promise<RoomDocument> {
    try {
      const RoomData = validateZod(RoomSchema.partial(), data);

      return await RoomRepo.update(id, RoomData);
    } catch (error) {
      throw error;
    }
  }
  async deleteRoom(id: string): Promise<RoomDocument> {
    try {
      const deletedRoom = await RoomRepo.delete(id);

      return deletedRoom;
    } catch (error) {
      throw error;
    }
  }
}

export default new RoomService();
