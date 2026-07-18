import { Router } from "express";
import RoomController from "./Room.controller";

const route = Router();

route.get("/room/:id", RoomController.getRoom);
route.get("/room", RoomController.getRooms);
route.post("/room", RoomController.createRoom);
route.patch("/room/:id", RoomController.updateRoom);
route.delete("/room/:id", RoomController.deleteRoom);

export default route;
