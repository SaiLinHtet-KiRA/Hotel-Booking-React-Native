import { Router } from "express";
import RatingController from "./Rating.controller";

const route = Router();

route.get("/rating/:id", RatingController.getRating);
route.post("/rating", RatingController.createRating);
route.patch("/rating/:id", RatingController.updateRating);
route.delete("/rating/:id", RatingController.deleteRating);

export default route;
