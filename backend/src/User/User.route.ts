import { Router } from "express";
import UserController from "./User.controller";
import CheckIsAdmin from "./middleware/CheckIsAdmin";

const route = Router();

route.get("/user/:id", CheckIsAdmin, UserController.getUser);
route.get("/user", CheckIsAdmin, UserController.getUsers);
route.post("/user", CheckIsAdmin, UserController.createUser);
route.patch("/user/:id", CheckIsAdmin, UserController.updateUser);
route.delete("/user/:id", CheckIsAdmin, UserController.deleteUser);

export default route;
