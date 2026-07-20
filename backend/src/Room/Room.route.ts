import { Router } from "express";
import RoomController from "./Room.controller";
import CanDelete from "./middleware/CanDelete";
import upload from "./util/multer";
import SaveImage from "./middleware/vercel-storage";

const route = Router();

route.get("/room/:id", RoomController.getRoom);
route.get("/room", RoomController.getRooms);
route.post(
  "/room",
  upload.array("photo"),
  SaveImage,
  RoomController.createRoom,
);
route.patch(
  "/room/:id",
  upload.array("photo"),
  SaveImage,
  RoomController.updateRoom,
);
route.delete("/room/:id", CanDelete, RoomController.deleteRoom);

export default route;
