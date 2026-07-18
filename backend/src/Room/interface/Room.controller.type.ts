import { Request, Response } from "express";
import { PaginationQuery } from "./Room.query.type";
import { Room, RoomDocument } from "../Room.model";

export default interface RoomControllerType {
  getRoom(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
  getRooms(
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{ message: string; data: RoomDocument[] }>,
  ): Promise<void>;
  updateRoom(
    req: Request<{ id: string }, null, Room, null>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
  createRoom(
    req: Request<null, null, Room, null>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
  deleteRoom(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
}
