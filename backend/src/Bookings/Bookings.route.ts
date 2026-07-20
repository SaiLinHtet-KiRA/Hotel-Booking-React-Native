import { Router } from "express";
import RatingsController from "./Bookings.controller";

const route = Router();

route.get("/bookings/:id", RatingsController.getBookings);

export default route;
