import { Room, RoomDocument } from "../Room.model";
import { PaginationQuery } from "./Room.query.type";

export default interface RoomRepoType {
  get(query: PaginationQuery): Promise<RoomDocument[]>;
  getByID(id: string): Promise<RoomDocument>;
  create(data: Room): Promise<RoomDocument>;
  update(id: string, data: Room): Promise<RoomDocument>;
  delete(id: string): Promise<RoomDocument>;
}
