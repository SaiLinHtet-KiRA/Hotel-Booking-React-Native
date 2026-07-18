import { validateZod } from "../util/validate";
import { PaginationQuery } from "./interface/User.query.type";
import UserServiceType from "./interface/User.service.type";
import { User, UserDocument, UserSchema } from "./User.model";
import UserRepo from "./User.repo";

class UserService implements UserServiceType {
  async getUsers(query: PaginationQuery): Promise<UserDocument[]> {
    try {
      const Users = await UserRepo.get(query);
      return Users;
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
  async updateUser(id: string, data: User): Promise<UserDocument> {
    try {
      try {
        const UserData = validateZod(UserSchema, data);

        return await UserRepo.update(id, UserData);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id: string): Promise<UserDocument> {
    try {
      return await UserRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
