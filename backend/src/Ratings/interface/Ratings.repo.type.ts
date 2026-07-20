import { Ratings, RatingsDocument } from "../Ratings.model";

export default interface RatingRepoType {
  get(): Promise<RatingsDocument[]>;
  getByID(id: string): Promise<RatingsDocument>;
  create(data: Ratings): Promise<RatingsDocument>;
  update(id: string, data: Ratings): Promise<RatingsDocument>;
  delete(id: string): Promise<RatingsDocument>;
}
