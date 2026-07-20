import { RatingDocument, Rating, RatingSchema } from "./Booking.model";
import RatingRepo from "./Booking.repo";
import RatingServiceType from "./interface/Rating.service.type";
import { validateZod } from "../../util/validate";
import RatingsService from "../Ratings.service";

class RatingService implements RatingServiceType {
  async getRatings(): Promise<RatingDocument[]> {
    try {
      const Ratings = await RatingRepo.get();
      return Ratings;
    } catch (error) {
      throw error;
    }
  }
  async getRating(id: string): Promise<RatingDocument> {
    try {
      return await RatingRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }
  async createRating(data: Rating): Promise<RatingDocument> {
    try {
      const RatingData = validateZod(RatingSchema, data);

      const newRating = await RatingRepo.create(RatingData);
      await RatingsService.updateRatings(newRating.RatingsId, {
        $push: { ratings: newRating._id },
      });

      return newRating;
    } catch (error) {
      throw error;
    }
  }
  async updateRating(id: string, data: Rating): Promise<RatingDocument> {
    try {
      try {
        const RatingData = validateZod(RatingSchema, data);

        return await RatingRepo.update(id, RatingData);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteRating(id: string): Promise<RatingDocument> {
    try {
      const deletedRating = await RatingRepo.delete(id);

      await RatingsService.updateRatings(deletedRating.RatingsId, {
        $pull: { ratings: deletedRating._id },
      });

      return deletedRating;
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingService();
