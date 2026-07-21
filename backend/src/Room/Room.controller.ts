import { Request, Response } from "express";
import { RoomDocument } from "./Room.model";
import RoomControllerType, {
  RoomCreateBody,
} from "./interface/Room.controller.type";
import RoomService from "./Room.service";
import { PaginationQuery } from "./interface/Room.query.type";

class RoomController implements RoomControllerType {
  async getRoom(
    req: Request<{ id: string }, null, null, null>,
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
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{ message: string; data: RoomDocument[] }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const Room = await RoomService.getRooms(query);
      res
        .status(200)
        .json({ message: "Rooms fetched successfully", data: Room });
    } catch (error) {
      throw error;
    }
  }

  async updateRoom(
    req: Request<{ id: string }, {}, RoomCreateBody, {}>,
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
    req: Request<{}, {}, RoomCreateBody, {}>,
    res: Response<{ message: string; data: RoomDocument }>,
  ): Promise<void> {
    try {
      const roomData = req.body;
      console.log(roomData);
      const Room = await RoomService.createRoom(roomData);
      res
        .status(200)
        .json({ message: "Room created successfully", data: Room });
    } catch (error) {
      throw error;
    }
  }

  async deleteRoom(
    req: Request<{ id: string }, null, null, null>,
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
