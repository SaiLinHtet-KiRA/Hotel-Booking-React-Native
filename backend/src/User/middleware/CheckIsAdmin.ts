import { Request, Response, NextFunction } from "express";
import { AuthorizeError } from "../../util/error/errors";
import UserService from "../User.service";

async function CheckIsAdmin(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request<any, any, any, any>,
  _res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.session.userId) {
      throw new AuthorizeError("Not logged in");
    }

    const user = await UserService.getUser(req.session.userId);

    if (user.role !== "admin" && user.role !== "owner") {
      throw new AuthorizeError("Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default CheckIsAdmin;
