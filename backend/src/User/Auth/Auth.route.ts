import { Router } from "express";
import AuthController from "./Auth.controller";

const route = Router();

route.post("/auth/signup", AuthController.SingUp);
route.post("/auth/login", AuthController.Login);
route.get("/auth/profile", AuthController.getProfile);
route.post("/auth/logout", AuthController.Logout);

export default route;
