import { Router } from "express";
import UserController from "./User.controller";

const route = Router();

route.get("/user/:id", UserController.getUser);
route.get("/user", UserController.getUsers);
route.post("/user", UserController.createUser);
route.patch("/user/:id", UserController.updateUser);
route.delete("/user/:id", UserController.deleteUser);

export default route;
