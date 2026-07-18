import { User, UserDocument } from "../User.model";
import { PaginationQuery } from "./User.query.type";

export default interface UserRepoType {
  get(query: PaginationQuery): Promise<UserDocument[]>;
  getByID(id: string): Promise<UserDocument>;
  create(data: User): Promise<UserDocument>;
  update(id: string, data: User): Promise<UserDocument>;
  delete(id: string): Promise<UserDocument>;
}
