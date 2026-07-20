import { NotFoundError } from "../../util/error/errors";
import RatingModel, { RatingDocument, Rating } from "./Rating.model";
import RatingRepoType from "./interface/Rating.repo.type";

class RatingRepo implements RatingRepoType {
  async get(): Promise<RatingDocument[]> {
    try {
      const Ratings = await RatingModel.find();
      if (Ratings) return Ratings;
      throw new Error(`Something was wrong in RatingRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<RatingDocument> {
    try {
      const Rating = await RatingModel.findById(id);
      if (Rating) return Rating;
      throw new NotFoundError(`${id} was not found in Rate Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Rating): Promise<RatingDocument> {
    try {
      const newRating = new RatingModel(data);
      return await newRating.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: Rating): Promise<RatingDocument> {
    try {
      const Rating = await RatingModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (Rating) return Rating;
      throw new NotFoundError(`${id} was not found in Rating Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<RatingDocument> {
    try {
      const Rating = await RatingModel.findByIdAndDelete(id);
      if (Rating) return Rating;
      throw new NotFoundError(`${id} was not found in Rating Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingRepo();
