import { Router } from "express";
import RatingsController from "./Bookings.controller";
import CheckLogin from "./middleware/CheckLogin";

const route = Router();

route.get("/bookings-col", CheckLogin, RatingsController.getBookings);

export default route;
