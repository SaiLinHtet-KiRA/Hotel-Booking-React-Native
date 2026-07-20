import { Request, Response } from "express";
import { Rating, RatingDocument } from "./Rating.model";
import RatingControllerType from "./interface/Rating.controller.type";
import RatingService from "./Rating.service";

class RatingController implements RatingControllerType {
  async getRating(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Rating = await RatingService.getRating(id);

      res
        .status(200)
        .json({ message: "Rating retrieved successfully", data: Rating });
    } catch (error) {
      throw error;
    }
  }
  async updateRating(
    req: Request<{ id: string }, null, Rating, null>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const Rating = await RatingService.updateRating(id, body);

      res
        .status(200)
        .json({ message: "Rating retrieved successfully", data: Rating });
    } catch (error) {
      throw error;
    }
  }
  async createRating(
    req: Request<{}, {}, Rating>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void> {
    try {
      const body = req.body;
      const Rating = await RatingService.createRating(body);

      res
        .status(200)
        .json({ message: "Rating retrieved successfully", data: Rating });
    } catch (error) {
      throw error;
    }
  }
  async deleteRating(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: RatingDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Rating = await RatingService.deleteRating(id);

      res
        .status(200)
        .json({ message: "Rating retrieved successfully", data: Rating });
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingController();
