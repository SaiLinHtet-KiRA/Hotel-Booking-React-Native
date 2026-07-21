import { Request, Response } from "express";
import { PaginationQuery } from "./Room.query.type";
import { Room, RoomDocument } from "../Room.model";

export type RoomCreateBody = Omit<Room, "userId">;

export default interface RoomControllerType {
  getRoom(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
  getRooms(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: RoomDocument[]; size: number }>,
  ): Promise<void>;
  updateRoom(
    req: Request<{ id: string }, unknown, RoomCreateBody>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
  createRoom(
    req: Request<Record<string, never>, unknown, RoomCreateBody>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
  deleteRoom(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void>;
}
