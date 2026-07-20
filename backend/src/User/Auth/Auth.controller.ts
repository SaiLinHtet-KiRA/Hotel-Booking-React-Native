import { Request, Response } from "express";

import AuthControllerType from "./interface/Auth.controller.type";
import LoginType from "./interface/Schema";
import AuthService from "./Auth.service";
import UserService from "../User.service";
import { User } from "../User.model";

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
    res: Response<{ message: string }>,
  ): Promise<void> {
    try {
      const userId = await AuthService.checkPasswordIsCorrect(req.body);

      req.session.userId = userId;

      res.status(200).json({ message: "Login success" });
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
        records: unknown[];
        id: number;
      };
    }>,
  ): Promise<void> {
    try {
      if (!req.session.userId) {
        res.status(401).json({
          message: "Not logged in",
        });
        return;
      }
      const { name, role, id, _id } = await UserService.getUser(
        req.session.userId,
      );

      res.json({
        message: "Logged In",
        data: { _id: String(_id), name, role, id },
      });
    } catch (error) {
      throw error;
    }
  }
  async Logout(
    req: Request<null, null, null, null>,
    res: Response<{ message: string }>,
  ): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      res.json({
        message: "Logged out",
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
