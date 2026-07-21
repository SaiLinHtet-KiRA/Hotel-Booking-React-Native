import { Request, Response, NextFunction } from "express";
import { AuthorizeError } from "../../util/error/errors";
import UserService from "../../User/User.service";

async function CheckLogin(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.userId) {
      throw new AuthorizeError("Not logged in");
    }
    const user = await UserService.getUser(req.userId);
    req.params.id = user.bookings.toString();

    next();
  } catch (error) {
    next(error);
  }
}

export default CheckLogin;
