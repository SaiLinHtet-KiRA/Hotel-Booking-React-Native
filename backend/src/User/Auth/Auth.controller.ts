import { Request, Response } from "express";

import AuthControllerType from "./interface/Auth.controller.type";
import LoginType from "./interface/Schema";
import AuthService from "./Auth.service";
import UserService from "../User.service";
import { User } from "../User.model";
import { signToken } from "../../util/jwt";
import { AuthorizeError } from "../../util/error/errors";

class AuthController implements AuthControllerType {
  async SingUp(
    req: Request<null, null, User, null>,
    res: Response<{ message: string }>,
  ): Promise<void> {
    try {
      await UserService.createUser(req.body);
      res.status(200).json({ message: "Account was successfully created" });
    } catch (error) {
      throw error;
    }
  }
  async Login(
    req: Request<null, null, LoginType, null>,
    res: Response<{ message: string; token?: string; data?: { _id: string; name: string; email: string; role: string } }>,
  ): Promise<void> {
    try {
      const userId = await AuthService.checkPasswordIsCorrect(req.body);
      const user = await UserService.getUser(userId);

      if (user.banned) {
        throw new AuthorizeError("Account has been banned");
      }

      const token = signToken({ userId, role: user.role || "user", banned: user.banned });

      res.status(200).json({
        message: "Login success",
        token,
        data: { _id: String(user._id), name: user.name, email: user.email, role: user.role || "user" },
      });
    } catch (error) {
      throw error;
    }
  }
  async getProfile(
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
  ): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "Not logged in" });
        return;
      }

      const { name, role, id, _id, email } = await UserService.getUser(req.userId);

      res.json({
        message: "Logged In",
        data: { _id: String(_id), name, role: role!, id, email },
      });
    } catch (error) {
      throw error;
    }
  }
  async Logout(
    _req: Request<null, null, null, null>,
    res: Response<{ message: string }>,
  ): Promise<void> {
    try {
      res.json({ message: "Logged out" });
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
