import { UpdateQuery } from "mongoose";
import { Room, RoomDocument } from "../Room.model";
import { PaginationQuery } from "./Room.query.type";

export default interface RoomRepoType {
  get(query: PaginationQuery): Promise<RoomDocument[]>;
  getCount(query: PaginationQuery): Promise<number>;
  getByID(id: string): Promise<RoomDocument>;
  create(data: Room): Promise<RoomDocument>;
  update(id: string, data: UpdateQuery<Room>): Promise<RoomDocument>;
  delete(id: string): Promise<RoomDocument>;
}
