import { Request, Response } from "express";
import { RatingsDocument } from "../Ratings.model";

export default interface RatingsControllerType {
  getRatings(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RatingsDocument }>,
  ): Promise<void>;
}
