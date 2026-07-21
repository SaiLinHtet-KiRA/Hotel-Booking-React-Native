import { Request, Response } from "express";
import { User, UserDocument } from "../User.model";
import { PaginationQuery } from "./User.query.type";

export type GetUserRequest = Request<{ id: string }>;
export type GetUsersRequest = Request;
export type UpdateUserRequest = Request<{ id: string }, unknown, User>;
export type CreateUserRequest = Request<Record<string, never>, unknown, User>;
export type DeleteUserRequest = Request<{ id: string }>;

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
