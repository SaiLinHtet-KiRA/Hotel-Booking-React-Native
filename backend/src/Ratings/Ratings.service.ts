import { RatingsDocument, Ratings, RatingsSchema } from "./Ratings.model";
import RatingsRepo from "./Ratings.repo";
import RatingsServiceType from "./interface/Ratings.service.type";
import { validateZod } from "../util/validate";
import { UpdateQuery } from "mongoose";

class RatingsService implements RatingsServiceType {
  async getRatings(): Promise<RatingsDocument[]> {
    try {
      const Ratingss = await RatingsRepo.get();
      return Ratingss;
    } catch (error) {
      throw error;
    }
  }
  async getRating(id: string): Promise<RatingsDocument> {
    try {
      return await RatingsRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }
  async calculateAverageRating(id: string): Promise<number> {
    try {
      const { ratings } = await this.getRating(id);

      return ratings.length === 0
        ? 0
        : ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    } catch (error) {
      throw error;
    }
  }
  async createRatings(data: Ratings): Promise<RatingsDocument> {
    try {
      const RatingsData = validateZod(RatingsSchema, data);

      const newRatings = await RatingsRepo.create(RatingsData);

      return newRatings;
    } catch (error) {
      throw error;
    }
  }
  async updateRatings(
    id: string,
    data: UpdateQuery<Ratings>,
  ): Promise<RatingsDocument> {
    try {
      try {
        const RatingsData = validateZod(RatingsSchema, data);

        return await RatingsRepo.update(id, RatingsData);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteRatings(id: string): Promise<RatingsDocument> {
    try {
      return await RatingsRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingsService();
