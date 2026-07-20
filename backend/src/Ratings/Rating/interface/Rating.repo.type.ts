import { Rating, RatingDocument } from "../Rating.model";

export default interface RatingRepoType {
  get(): Promise<RatingDocument[]>;
  getByID(id: string): Promise<RatingDocument>;
  create(data: Rating): Promise<RatingDocument>;
  update(id: string, data: Rating): Promise<RatingDocument>;
  delete(id: string): Promise<RatingDocument>;
}
