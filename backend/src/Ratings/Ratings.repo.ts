import UserModel from "../User/User.model";
import { NotFoundError } from "../util/error/errors";
import RatingModel from "./Rating/Rating.model";
import RatingsModel, { RatingsDocument, Ratings } from "./Ratings.model";
import RatingsRepoType from "./interface/Ratings.repo.type";

class RatingsRepo implements RatingsRepoType {
  async get(): Promise<RatingsDocument[]> {
    try {
      const Ratingss = await RatingsModel.find();
      if (Ratingss) return Ratingss;
      throw new Error(`Something was wrong in RatingsRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<RatingsDocument> {
    try {
      const Ratings = await RatingsModel.findById(id).populate({
        path: "ratings",
        model: RatingModel,
        populate: { path: "user", model: UserModel },
      });
      if (Ratings) return Ratings;
      throw new NotFoundError(`${id} was not found in Rate Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Ratings): Promise<RatingsDocument> {
    try {
      const newRatings = new RatingsModel(data);
      return await newRatings.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: Ratings): Promise<RatingsDocument> {
    try {
      const Ratings = await RatingsModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (Ratings) return Ratings;
      throw new NotFoundError(`${id} was not found in Ratings Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<RatingsDocument> {
    try {
      const Ratings = await RatingsModel.findByIdAndDelete(id);
      if (Ratings) return Ratings;
      throw new NotFoundError(`${id} was not found in Ratings Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingsRepo();
