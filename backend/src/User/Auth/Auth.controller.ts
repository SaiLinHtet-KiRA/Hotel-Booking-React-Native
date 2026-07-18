import { Request, Response } from "express";

import AuthControllerType from "./interface/Auth.controller.type";
import LoginType from "./interface/Schema";
import AuthService from "./Auth.service";
import UserService from "../User.service";

class AuthController implements AuthControllerType {
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
      data?: { name: string; role: string; records: unknown[]; id: number };
    }>,
  ): Promise<void> {
    try {
      if (!req.session.userId) {
        res.status(401).json({
          message: "Not logged in",
        });
        return;
      }
      const { name, role, records, id } = await UserService.getUser(
        req.session.userId,
      );

      res.json({
        message: "Logged In",
        data: { name, role, records, id },
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
