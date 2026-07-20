import { Request, Response } from "express";
import { RatingsDocument } from "./Ratings.model";
import RatingsControllerType from "./interface/Ratings.controller.type";
import RatingsService from "./Ratings.service";

class RatingsController implements RatingsControllerType {
  async getRatings(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RatingsDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Ratings = await RatingsService.getRating(id);

      res
        .status(200)
        .json({ message: "Ratings retrieved successfully", data: Ratings });
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingsController();
