import { Rating, RatingDocument } from "../Rating.model";

export default interface RatingServiceType {
  getRatings(): Promise<RatingDocument[]>;
  getRating(ID: string): Promise<RatingDocument>;
  createRating(data: Rating): Promise<RatingDocument>;
  updateRating(id: string, data: Rating): Promise<RatingDocument>;
  deleteRating(id: string): Promise<RatingDocument>;
}
