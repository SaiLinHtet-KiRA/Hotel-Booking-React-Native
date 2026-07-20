import { Request, Response } from "express";
import { Rating, RatingDocument } from "../Booking.model";

export default interface RatingControllerType {
  getRating(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void>;
  updateRating(
    req: Request<{ id: string }, null, Rating, null>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void>;
  createRating(
    req: Request<{}, {}, Rating>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void>;
  deleteRating(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void>;
}
