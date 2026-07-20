import { UpdateQuery } from "mongoose";
import { Ratings, RatingsDocument } from "../Ratings.model";

export default interface RatingsServiceType {
  getRatings(): Promise<RatingsDocument[]>;
  getRating(ID: string): Promise<RatingsDocument>;
  calculateAverageRating(id: string): Promise<number>;

  createRatings(data: Ratings): Promise<RatingsDocument>;
  updateRatings(
    id: string,
    data: UpdateQuery<Ratings>,
  ): Promise<RatingsDocument>;
  deleteRatings(id: string): Promise<RatingsDocument>;
}
