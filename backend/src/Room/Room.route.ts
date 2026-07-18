import { Router } from "express";
import RoomController from "./Room.controller";
import CanDelete from "./middleware/CanDelete";

const route = Router();

route.get("/room/:id", RoomController.getRoom);
route.get("/room", RoomController.getRooms);
route.post("/room", RoomController.createRoom);
route.patch("/room/:id", RoomController.updateRoom);
route.delete("/room/:id", CanDelete, RoomController.deleteRoom);

export default route;
