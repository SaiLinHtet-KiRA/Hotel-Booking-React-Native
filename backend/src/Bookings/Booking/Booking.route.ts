import { Router } from "express";
import BookingController from "./Booking.controller";
import CheckLogin from "./middleware/CheckLogin";
import CheckIsAdmin from "./middleware/CheckIsAdmin";

const route = Router();

route.get("/booking/:id", BookingController.getBooking);
route.get("/bookings", CheckIsAdmin, BookingController.getBookings);
route.post("/booking", CheckLogin, BookingController.createBooking);
route.patch(
  "/booking/:id",
  CheckLogin,
  CheckIsAdmin,
  BookingController.updateBooking,
);
route.delete("/booking/:id", CheckIsAdmin, BookingController.deleteBooking);

export default route;
