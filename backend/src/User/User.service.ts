import { UpdateQuery } from "mongoose";
import { validateZod } from "../util/validate";
import { PaginationQuery } from "./interface/User.query.type";
import UserServiceType from "./interface/User.service.type";
import { User, UserDocument, UserSchema } from "./User.model";
import UserRepo from "./User.repo";

class UserService implements UserServiceType {
  async getUsers(
    query: PaginationQuery,
  ): Promise<{ data: UserDocument[]; size: number }> {
    try {
      const data = await UserRepo.get(query);
      const size = await this.getSize(query);

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(query: PaginationQuery): Promise<number> {
    try {
      return await UserRepo.getCount(query);
    } catch (error) {
      throw error;
    }
  }
  async getUser(id: string): Promise<UserDocument> {
    try {
      return await UserRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }
  async createUser(data: User): Promise<UserDocument> {
    try {
      const UserData = validateZod(UserSchema, data);

      const newUser = await UserRepo.create(UserData);

      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id: string, data: UpdateQuery<User>): Promise<UserDocument> {
    try {
      return await UserRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id: string): Promise<UserDocument> {
    try {
      const deletedUser = await UserRepo.delete(id);

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
