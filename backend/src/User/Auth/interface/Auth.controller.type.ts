import { Request, Response } from "express";
import LoginType from "./Schema";
import { User } from "../../User.model";

export default interface AuthControllerType {
  SingUp(
    req: Request<null, null, User, null>,
    res: Response<{ message: string }>,
  ): Promise<void>;
  Login(
    req: Request<null, null, LoginType, null>,
    res: Response<{
      message: string;
      token?: string;
      data?: { _id: string; name: string; email: string; role: string };
    }>,
  ): Promise<void>;
  getProfile(
    req: Request<null, null, null, null>,
    res: Response<{
      message: string;
      data?: {
        _id: string;
        name: string;
        role: string;
        email: string;
        id: number;
      };
    }>,
  ): Promise<void>;
  Logout(
    req: Request<null, null, null, null>,
    res: Response<{ message: string }>,
  ): Promise<void>;
}
