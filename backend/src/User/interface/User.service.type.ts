import { UpdateQuery } from "mongoose";
import { User, UserDocument } from "../User.model";
import { PaginationQuery } from "./User.query.type";

export default interface UserServiceType {
  getUsers(query: PaginationQuery): Promise<UserDocument[]>;
  getUser(ID: string): Promise<UserDocument>;
  createUser(data: User): Promise<UserDocument>;
  updateUser(id: string, data: UpdateQuery<User>): Promise<UserDocument>;
  deleteUser(id: string): Promise<UserDocument>;
}
