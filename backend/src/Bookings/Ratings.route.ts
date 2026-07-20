import { Router } from "express";
import RatingsController from "./Ratings.controller";

const route = Router();

route.get("/ratings/:id", RatingsController.getRatings);

export default route;
