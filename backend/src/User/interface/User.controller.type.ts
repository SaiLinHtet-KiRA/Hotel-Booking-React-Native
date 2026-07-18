import { Request, Response } from "express";
import { User, UserDocument } from "../User.model";
import { PaginationQuery } from "./User.query.type";

export default interface UserControllerType {
  getUser(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
  getUsers(
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{ message: string; data: UserDocument[] }>,
  ): Promise<void>;
  updateUser(
    req: Request<{ id: string }, null, User, null>,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
  createUser(
    req: Request<null, null, User, null>,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
  deleteUser(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
}
