import { Response } from "express";
import UserControllerType, {
  GetUserRequest,
  GetUsersRequest,
  UpdateUserRequest,
  CreateUserRequest,
  DeleteUserRequest,
} from "./interface/User.controller.type";
import { UserDocument } from "./User.model";
import UserService from "./User.service";

class UserController implements UserControllerType {
  async getUser(
    req: GetUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const User = await UserService.getUser(id);

      res
        .status(200)
        .json({ message: "User retrieved successfully", data: User });
    } catch (error) {
      throw error;
    }
  }

  async getUsers(
    req: GetUsersRequest,
    res: Response<{ message: string; data: UserDocument[]; size: number }>,
  ): Promise<void> {
    try {
      const query = req.query;

      const data = await UserService.getUsers(query);
      res.status(200).json({ message: "Users fetched successfully", ...data });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    req: UpdateUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const User = await UserService.updateUser(id, req.body);
      res
        .status(200)
        .json({ message: "User updated successfully", data: User });
    } catch (error) {
      throw error;
    }
  }

  async createUser(
    req: CreateUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void> {
    try {
      const User = await UserService.createUser(req.body);
      res
        .status(200)
        .json({ message: "User created successfully", data: User });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(
    req: DeleteUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const User = await UserService.deleteUser(id);

      res
        .status(200)
        .json({ message: "User deleted successfully", data: User });
    } catch (error) {
      throw error;
    }
  }
}

export default new UserController();
