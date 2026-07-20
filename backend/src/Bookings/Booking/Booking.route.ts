import { Router } from "express";
import BookingController from "./Booking.controller";

const route = Router();

route.get("/booking/:id", BookingController.getBooking);
route.post("/booking", BookingController.createBooking);
route.delete("/booking/:id", BookingController.deleteBooking);

export default route;
