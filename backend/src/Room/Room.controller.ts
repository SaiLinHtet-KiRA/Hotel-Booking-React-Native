import { Request, Response } from "express";
import { RoomDocument } from "./Room.model";
import RoomControllerType, {
  RoomCreateBody,
} from "./interface/Room.controller.type";
import RoomService from "./Room.service";
import { PaginationQuery } from "./interface/Room.query.type";

class RoomController implements RoomControllerType {
  async getRoom(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Room = await RoomService.getRoom(id);

      res
        .status(200)
        .json({ message: "Room retrieved successfully", data: Room });
    } catch (error) {
      throw error;
    }
  }

  async getRooms(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: RoomDocument[]; size: number }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const data = await RoomService.getRooms(query);
      res.status(200).json({ message: "Rooms fetched successfully", ...data });
    } catch (error) {
      throw error;
    }
  }

  async updateRoom(
    req: Request<{ id: string }, unknown, RoomCreateBody>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const roomData = req.body;
      const Room = await RoomService.updateRoom(id, roomData);
      res
        .status(200)
        .json({ message: "Room updated successfully", data: Room });
    } catch (error) {
      throw error;
    }
  }

  async createRoom(
    req: Request<Record<string, never>, unknown, RoomCreateBody>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void> {
    try {
      const roomData = req.body;
      const Room = await RoomService.createRoom(roomData);
      res
        .status(200)
        .json({ message: "Room created successfully", data: Room });
    } catch (error) {
      throw error;
    }
  }

  async deleteRoom(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Room = await RoomService.deleteRoom(id);

      res
        .status(200)
        .json({ message: "Room deleted successfully", data: Room });
    } catch (error) {
      throw error;
    }
  }
}

export default new RoomController();
