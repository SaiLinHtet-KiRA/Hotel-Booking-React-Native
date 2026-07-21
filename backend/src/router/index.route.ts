import { Router } from "express";
import UserRoute from "../User/User.route";
import AuthRoute from "../User/Auth/Auth.route";
import RoomRoute from "../Room/Room.route";
import BookingsRoute from "../Bookings/Bookings.route";
import BookingRoute from "../Bookings/Booking/Booking.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json("all good").status(200);
});
router.use(UserRoute);
router.use(RoomRoute);
router.use(AuthRoute);
router.use(BookingsRoute);
router.use(BookingRoute);

export default router;
