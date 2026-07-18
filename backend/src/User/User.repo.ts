import { NotFoundError } from "../util/error/errors";
import { PaginationQuery } from "./interface/User.query.type";
import UserRepoType from "./interface/User.repo.type";
import UserModel, { User, UserDocument } from "./User.model";

class UserRepo implements UserRepoType {
  async get({
    limit,
    page,
    role,
    name,
  }: PaginationQuery): Promise<UserDocument[]> {
    try {
      const Users = await UserModel.find(
        name
          ? { name }
          : role
            ? {
                role,
              }
            : {},
        {},
        page && limit ? { skip: page * limit, limit } : {},
      );
      if (Users) return Users;
      throw new Error(`Something was wrong in UserRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<UserDocument> {
    try {
      const User = await UserModel.findById(id);
      if (User) return User;
      throw new NotFoundError(`${id} was not found in User Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: User): Promise<UserDocument> {
    try {
      const newUser = new UserModel(data);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: User): Promise<UserDocument> {
    try {
      const User = await UserModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (User) return User;
      throw new NotFoundError(`${id} was not found in User Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<UserDocument> {
    try {
      const User = await UserModel.findByIdAndDelete(id);
      if (User) return User;
      throw new NotFoundError(`${id} was not found in User Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepo();
