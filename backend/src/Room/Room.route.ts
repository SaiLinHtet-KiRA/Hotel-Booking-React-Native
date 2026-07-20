import { Router } from "express";
import RoomController from "./Room.controller";
import CanDelete from "./middleware/CheckAdmin";
import upload from "./util/multer";
import SaveImage from "./middleware/vercel-storage";
import CheckAdmin from "./middleware/CheckAdmin";

const route = Router();

route.get("/room/:id", RoomController.getRoom);
route.get("/room", RoomController.getRooms);
route.post(
  "/room",
  CheckAdmin,
  upload.array("photo"),
  SaveImage,
  RoomController.createRoom,
);
route.patch(
  "/room/:id",
  CheckAdmin,
  upload.array("photo"),
  SaveImage,
  RoomController.updateRoom,
);
route.delete("/room/:id", CheckAdmin, CanDelete, RoomController.deleteRoom);

export default route;
