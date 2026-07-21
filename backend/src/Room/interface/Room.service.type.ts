import { Room, RoomDocument } from "../Room.model";
import { PaginationQuery } from "./Room.query.type";

export default interface RoomServiceType {
  getRooms(
    query: PaginationQuery,
  ): Promise<{ data: RoomDocument[]; size: number }>;
  getSize(query: PaginationQuery): Promise<number>;

  getRoom(id: string): Promise<RoomDocument>;
  createRoom(data: Room): Promise<RoomDocument>;
  updateRoom(id: string, data: Partial<Room>): Promise<RoomDocument>;
  deleteRoom(id: string): Promise<RoomDocument>;
}
