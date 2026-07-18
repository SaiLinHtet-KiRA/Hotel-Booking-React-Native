import { Request, Response } from "express";
import UserControllerType from "./interface/User.controller.type";
import { User, UserDocument } from "./User.model";
import UserService from "./User.service";
import { PaginationQuery } from "./interface/User.query.type";

class UserController implements UserControllerType {
  async getUser(
    req: Request<{ id: string }, null, null, null>,
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
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{ message: string; data: UserDocument[] }>,
  ): Promise<void> {
    try {
      const query = req.query;

      const User = await UserService.getUsers(query);
      res
        .status(200)
        .json({ message: "Users fetched successfully", data: User });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    req: Request<{ id: string }, null, User, null>,
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
    req: Request<null, null, User, null>,
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
    req: Request<{ id: string }, null, null, null>,
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
