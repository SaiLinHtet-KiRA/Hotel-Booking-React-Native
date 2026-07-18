import { Router } from "express";
import UserRoute from "../User/User.route";
import AuthRoute from "../User/Auth/Auth.route";
import RoomRoute from "../Room/Room.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json("all good").status(200);
});
router.use(UserRoute);
router.use(RoomRoute);
router.use(AuthRoute);

export default router;
