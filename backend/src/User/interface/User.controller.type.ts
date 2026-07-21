import { Request, Response } from "express";
import { User, UserDocument } from "../User.model";
import { PaginationQuery } from "./User.query.type";

export type GetUserRequest = Request<{ id: string }, null, null, null>;
export type GetUsersRequest = Request<null, null, null, PaginationQuery>;
export type UpdateUserRequest = Request<{ id: string }, null, User, null>;
export type CreateUserRequest = Request<null, null, User, null>;
export type DeleteUserRequest = Request<{ id: string }, null, null, null>;

export default interface UserControllerType {
  getUser(
    req: GetUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
  getUsers(
    req: GetUsersRequest,
    res: Response<{ message: string; data: UserDocument[]; size: number }>,
  ): Promise<void>;
  updateUser(
    req: UpdateUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
  createUser(
    req: CreateUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
  deleteUser(
    req: DeleteUserRequest,
    res: Response<{ message: string; data: UserDocument }>,
  ): Promise<void>;
}
